import React, { Component } from "react";
import { Keyboard, Alert } from "react-native";
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
	connectStyle
} from "native-base";
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';
import Spinner from 'react-native-loading-spinner-overlay';
import { ForgotPassword } from "./../ForgotPassword";
import authProvider from "./../../providers/auth/auth";

//import styles from "./styles";

export default class LoginWithEmail extends Component {
	
	loginWithEmailForm: object;
	
	static navigationOptions = {
		title: 'Login With Email', 
		headerStyle: {
			backgroundColor: '#f8f8f8'
		}, 
		headerTitleStyle: {
			color: '#28404F'
		}, 
		headerBackTitle: 'Back'
	}
	
	constructor(props, context) {
        super(props, context);
        this.state = {
            forgotPasswordOpen: false, 
			loading: false, 
			valid: false
        }
		this.loginWithEmailForm = {
			email: null, 
			password: null
		}
		this.focusNextField = this.focusNextField.bind(this);
    	this.inputs = {};
    }
	
	focusNextField(key) {
		this.inputs[key]._root.focus();
	}
	
	loginWithEmail(rootNav) {
		if (!this.state.valid) {
			return false;
		}
		let email = this.loginWithEmailForm.email;
		let password = this.loginWithEmailForm.password;
		this.setState({ loading: true }, () => {
			authProvider.loginWithEmail(email, password).then(() => {
				this.setState({ loading: false }, () => {
					setTimeout(() => {
						rootNav.navigate('AuthStack');
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
	
	validateLoginWithEmailForm() {
		let email = this.loginWithEmailForm.email;
		let password = this.loginWithEmailForm.password;
		this.setState({ 
			valid: (email && password) ? true : false
		});
	}
	
	render() {
		
		const styles = this.props.style;
		const rootNav = this.props.screenProps.rootNavigation;
		
		return (
			<StyleProvider style={getTheme(myTheme)}>
				<Container>
					<Content padder>
						<Form rounded>
							<Item first>
								<Label>Email</Label>
								<Input 
									keyboardType="email-address" 
									autoCapitalize="none" 
									onChangeText={(value) => {
										this.loginWithEmailForm.email = value, 
										this.validateLoginWithEmailForm()
									}} 
									autoCorrect={false} 
									blurOnSubmit={false} 
									onSubmitEditing={() => {
										this.focusNextField('password');
									}} 
									returnKeyType={"next"} 
									ref={input => {
										 this.inputs['email'] = input;
									}} />
							</Item>
							<Item last>
								<Label>Password</Label>
								<Input 
									onChangeText={(value) => {
										this.loginWithEmailForm.password = value, 
										this.validateLoginWithEmailForm()
									}} 
									secureTextEntry={true} 
									blurOnSubmit={true} 
									ref={input => {
										 this.inputs['password'] = input;
									}} />
							</Item>
							{ !this.state.valid && <Button block primary submit disabled>
								<Text>Sign In</Text>
							</Button> }
							{ this.state.valid && <Button block primary submit onPress={() => this.loginWithEmail(rootNav)}>
								<Text>Sign In</Text>
							</Button> }
						</Form>
					</Content>
					<View style={{padding: 20}}>
						<Button block primary transparent onPress={() => this.toggleForgotPassword()}>
							<Text>Forgot Password</Text>
						</Button>
					</View>
					<ForgotPassword visible={this.state.forgotPasswordOpen} onClose={()=>this.toggleForgotPassword()} />
					<Spinner visible={this.state.loading} />
				</Container>
			</StyleProvider>
		)
		
	}
	
	toggleForgotPassword() {
		this.setState({
            forgotPasswordOpen: !this.state.forgotPasswordOpen
        });
	}
	
}
