import React, { Component } from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { View, Button, Input, Text, Container } from './../../theme';
import authProvider from "./../../providers/auth";

export class ChangePassword extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			valid: false, 
			loading: false
		}
		this.changePasswordForm = {
			current: null, 
			new: null
		}
		this.inputs = {};
	}
	
	focusNextField(key) {
		this.inputs[key].focus();
	}
	
	validateChangePasswordForm() {
		let currentPassword = this.changePasswordForm.current;
		let newPassword = this.changePasswordForm.new;
		this.setState({ 
			valid: (currentPassword && newPassword) ? true : false
		});
	}
	
	changePassword() {
		if (!this.state.valid) {
			return false;
		}
		let currentPassword = this.changePasswordForm.current;
		let newPassword = this.changePasswordForm.new;
		this.setState({ loading: true }, () => {
			authProvider.updatePassword(currentPassword, newPassword).then(() => {
				this.setState({ loading: false }, () => {
					this.props.navigator.pop();
				});
			}, error => {
				this.setState({ loading: false }, () => {
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
							<Input style={{ 
								borderBottomWidth: 1, 
								borderBottomColor: '#ddd', 
								borderBottomLeftRadius: 0, 
								borderBottomRightRadius: 0 }}
								secureTextEntry={true}
								onChangeText={(value) => {
									this.changePasswordForm.current = value, 
									this.validateChangePasswordForm()
								}}
								onSubmitEditing={() => {
									this.focusNextField('new')
								}}
								inputRef={input => {
                                    this.inputs['current'] = input;
                                }}>
								<Input.Before>
									<Text style={{ marginRight: 24 }}>Current</Text>
								</Input.Before>
							</Input>
							<Input style={{ 
								borderTopLeftRadius: 0, 
								borderTopRightRadius: 0 }}
								secureTextEntry={true}
								onChangeText={(value) => {
									this.changePasswordForm.new = value, 
									this.validateChangePasswordForm()
								}}
								inputRef={input => {
                                    this.inputs['new'] = input;
                                }}>
								<Input.Before>
									<Text style={{ marginRight: 24 }}>New</Text>
								</Input.Before>
							</Input>
						</View>

						{ (!this.state.valid || this.state.loading) && <Button disabled>
							<Button.Text>Submit</Button.Text>
						</Button> }
							
						{ (this.state.valid && !this.state.loading) && <Button onPress={() => this.changePassword()}>
							<Button.Text>Submit</Button.Text>
						</Button> }

					</View>
			
				</Container>
			
			</KeyboardAvoidingView>
			
			</TouchableWithoutFeedback>
			
		);
		
	}
	
}
