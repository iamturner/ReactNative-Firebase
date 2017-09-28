import React, { Component } from "react";
import { View, Alert } from "react-native";
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

export default class ChangePassword extends Component {
	
	static navigationOptions = {
		title: 'Password', 
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
			showToast: false, 
			valid: false
        }
		this.changePasswordForm = {
			current: null, 
			new: null
		}
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
					setTimeout(() => {
						Toast.show({
              				text: 'Your password has been updated.',
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
	}
	
	validateChangePasswordForm() {
		let currentPassword = this.changePasswordForm.current;
		let newPassword = this.changePasswordForm.new;
		this.setState({ 
			valid: (currentPassword && newPassword) ? true : false
		});
	}
	
	render() {
		
		const rootNav = this.props.screenProps.rootNavigation;
		
		return (
			<StyleProvider style={getTheme(myTheme)}>
				<Container>
					<Content padder>
						<Form rounded>
							<Item first>
								<Label>Current</Label>
								<Input 
									onChangeText={(value) => {
										this.changePasswordForm.current = value, 
										this.validateChangePasswordForm()
									}} 
									secureTextEntry={true} />
							</Item>
							<Item last>
								<Label>New</Label>
								<Input 
									onChangeText={(value) => {
										this.changePasswordForm.new = value, 
										this.validateChangePasswordForm()
									}} 
									secureTextEntry={true} />
							</Item>
							{ !this.state.valid && <Button block primary submit disabled>
								<Text>Submit</Text>
							</Button> }
							{ this.state.valid && <Button block primary submit onPress={() => this.changePassword()}>
								<Text>Submit</Text>
							</Button> }
						</Form>
					</Content>
					<Spinner visible={this.state.loading} />
				</Container>
			</StyleProvider>
		)
		
	}
	
}
