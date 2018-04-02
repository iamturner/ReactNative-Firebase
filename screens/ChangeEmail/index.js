import React, { Component } from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, AlertIOS } from 'react-native';
import { View, Button, Input, Text, Container, Loading } from './../../theme';
import authProvider from "./../../providers/auth";
import prompt from 'react-native-prompt-android';

export class ChangeEmail extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			valid: false
		}
		this.changeEmailForm = { 
			newEmail: null
		}
	}
	
	validateChangeEmailForm() {
		let email = this.changeEmailForm.newEmail;
		this.setState({ 
			valid: (email) ? true : false
		});
	}
	
	changeEmail() {
		if (!this.state.valid) {
			return false;
		}
		let newEmail = this.changeEmailForm.newEmail;
		/* User must reauthenticate with Firebase before changing their email */
		if (Platform.OS === 'ios') {
			AlertIOS.prompt(
				'Password Confirmation',
				'Please confirm your password to change your email address',
				password => {
					this.actionChangeEmail(newEmail, password);
				}, 
				'secure-text'
			);
		} else {
			prompt(
				'Password Confirmation',
				'Please confirm your password to change your email address', [{
					text: 'Cancel', onPress: () => {/* Cancelled */}, style: 'cancel'}, {
					text: 'OK', onPress: password => this.actionChangeEmail(newEmail, password)
				}], { 
					type: 'secure-text', 
					cancelable: false 
				});
		}
	}
	
	actionChangeEmail(newEmail, password) {
		Loading.show().then(() => {
			authProvider.updateEmail(newEmail, password).then(() => {
				Loading.dismiss().then(() => {
					this.props.navigator.pop();
				});
			}, error => {
				Loading.dismiss().then(() => {
					Alert.alert('Error', error.message, [{text: 'OK'}], { cancelable: false });
				});
			});
		});
	}
	
	render() {
		
		return (
			
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
						
				<Container padding>

					{/* Inputs */}

					<View style={{ flex: 1 }}>
			
						<View style={{ marginBottom: 16 }}>
							<Input 
								keyboardType="email-address" 
								autoCapitalize="none" 
								onChangeText={(value) => {
									this.changeEmailForm.newEmail = value, 
									this.validateChangeEmailForm()
								}} 
								autoCorrect={false}>
								<Input.Before>
									<Text style={{ marginRight: 24 }}>Email</Text>
								</Input.Before>
							</Input>
						</View>

						{ (!this.state.valid) && <Button disabled>
							<Button.Text>Submit</Button.Text>
						</Button> }
							
						{ (this.state.valid) && <Button onPress={() => this.changeEmail()}>
							<Button.Text>Submit</Button.Text>
						</Button> }

					</View>
			
				</Container>
			
			</KeyboardAvoidingView>
			
			</TouchableWithoutFeedback>
			
		);
		
	}
	
}
