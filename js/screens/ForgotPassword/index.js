import React, { Component } from "react";
import { Modal, StatusBar, Alert } from "react-native";
import { 
	Container, 
	Content, 
	Button, 
	Text, 
	Form, 
	Item, 
	Input, 
	Label, 
	StyleProvider, 
	View, 
	Header, 
	Left, 
	Right, 
	Body, 
	Title, 
	Toast
} from "native-base";
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';
import Spinner from 'react-native-loading-spinner-overlay';
import authProvider from "./../../providers/auth/auth";

import styles from "./styles";

export class ForgotPassword extends Component {
	
	constructor(props, context){
        super(props, context);
		this.state = {
			visible: false, 
			loading: false, 
			showToast: false, 
			valid: false
        }
		this.recoverPasswordForm = { 
			email: null
		}
		this.onClose = () => props.onClose()
    }
	
	recoverPassword() {
		if (!this.state.valid) {
			return false;
		}
		this.setState({ loading: true }, () => {
			authProvider.recoverPassword(this.recoverPasswordForm.email).then(() => {
				this.setState({ loading: false }, () => {
					setTimeout(() => {
						Toast.show({
							text: 'A reset link has been sent to your email.',
							duration: 3000, 
							position: 'bottom'
						});
						this.hide();
					}, 10);
				});
			}, error => {
				this.setState({ loading: false }, () => {
					setTimeout(() => {
						Alert.alert('Error', error.message, [{text: 'OK'}], { cancelable: false });
					}, 10);
				});
			});
		});
	}
	
	validateRecoverPasswordForm() {
		let email = this.recoverPasswordForm.email;
		this.setState({ 
			valid: (email) ? true : false
		});
	}
	
	render() {
		return (
			<View>
				<Modal animationType="slide" transparent={false} visible={this.props.visible === true}>
					<StyleProvider style={getTheme(myTheme)}>
						<Container style={styles.container}>
							<Header>
								<StatusBar barStyle="dark-content"/>
								<Left>
									<Button transparent onPress={() => this.hide()}>
										<Text>Cancel</Text>
									</Button>
								</Left>
								<Body>
									<Title>Forgot Password</Title>
								</Body>
								<Right />
							</Header>
							<Content padder>
								<Form rounded>
									<View listHeading noPadding style={{marginBottom: 16}}>
										<Text>Please enter your email address and we will send you a link to reset your password.</Text>
									</View>
									<Item first last>
										<Label>Email</Label>
										<Input 
											keyboardType="email-address" 
											autoCapitalize="none" 
											onChangeText={(value) => {
												this.recoverPasswordForm.email = value, 
												this.validateRecoverPasswordForm()
											}} 
											autoCorrect={false} />
									</Item>
									<View style={{marginTop: 24}}>
										{ !this.state.valid && <Button block primary disabled>
											<Text>Submit</Text>
										</Button> }
										{ this.state.valid && <Button block primary onPress={() => this.recoverPassword()}>
											<Text>Submit</Text>
										</Button> }
									</View>
								</Form>
							</Content>
							<Spinner visible={this.state.loading} />
						</Container>
					</StyleProvider>
				</Modal>
			</View>
		)
	}
	
	hide() {
		this.onClose()
        this.setState({
            visible: false
        })
    }
	
}
