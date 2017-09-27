import React, { Component } from "react";
import { View, Alert, AlertIOS } from "react-native";
import { 
	Container, 
	Content, 
	StyleProvider, 
	Form,
	Item, 
	Label, 
	Input, 
	Button, 
	Text, 
	Toast
} from "native-base";
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';
import Spinner from 'react-native-loading-spinner-overlay';
import authProvider from "./../../providers/auth/auth";

export default class ChangeEmail extends Component {
	
	static navigationOptions = {
		title: 'Email', 
		headerStyle: {
			backgroundColor: '#f8f8f8'
		}, 
		headerTitleStyle: {
			color: '#28404F'
		}, 
		headerBackTitle: 'Back'
	}
	
	constructor(props) {
		super(props);
		this.state = {
			loading: false, 
			showToast: false
        }
		this.changeEmailForm = { 
			newEmail: null
		}
	}
	
	changeEmail() {
		let newEmail = this.changeEmailForm.newEmail;
		if (newEmail == null) {
			return false;
		}
		AlertIOS.prompt(
			'Password Confirmation',
			'Please confirm your password to change your email address',
			password => {
				this.setState({ loading: true }, () => {
					authProvider.updateEmail(newEmail, password).then(() => {
						this.setState({ loading: false }, () => {
							setTimeout(() => {
								Toast.show({
									text: 'Your email address has been updated.',
									duration: 3000, 
									position: 'bottom'
								});
								this.props.navigation.goBack();
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
			}, 
			'secure-text'
		);
	}
	
	render() {
		
		const rootNav = this.props.screenProps.rootNavigation;
		
		return (
			<StyleProvider style={getTheme(myTheme)}>
				<Container>
					<Content padder>
						<Form rounded>
							<Item fixedLabel first last>
								<Label>Email</Label>
								<Input 
									keyboardType="email-address" 
									autoCapitalize="none" 
									onChangeText={(value) => this.changeEmailForm.newEmail = value} 
									autoCorrect={false} />
							</Item>
							<Button block primary submit onPress={() => this.changeEmail()}>
								<Text>Submit</Text>
							</Button>
						</Form>
					</Content>
					<Spinner visible={this.state.loading} />
				</Container>
			</StyleProvider>
		)
		
	}
	
}
