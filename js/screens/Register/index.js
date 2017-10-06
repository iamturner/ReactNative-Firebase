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
	View 
} from "native-base";
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';
import Spinner from 'react-native-loading-spinner-overlay';
import authProvider from "./../../providers/auth/auth";

import styles from "./styles";

export default class Register extends Component {
	
	registerForm: object;
	
	static navigationOptions = {
		title: 'Register', 
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
			loading: false, 
			valid: false
        }
		this.registerForm = {
			name: null, 
			email: null, 
			password: null
		}
    	this.focusNextField = this.focusNextField.bind(this);
    	this.inputs = {};
    }
	
	focusNextField(key) {
		this.inputs[key]._root.focus();
	}
	
	register(rootNav) {
		if (!this.state.valid) {
			return false;
		}
		let name = this.registerForm.name;
		let email = this.registerForm.email;
		let password = this.registerForm.password;
		this.setState({ loading: true }, () => {
			authProvider.register(name, email, password).then(() => {
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
	
	validateRegisterForm() {
		let name = this.registerForm.name;
		let email = this.registerForm.email;
		let password = this.registerForm.password;
		this.setState({ 
			valid: (name && email && password) ? true : false
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
								<Label>Name</Label>
								<Input 
									onChangeText={(value) => {
										this.registerForm.name = value, 
										this.validateRegisterForm()
									}} 
									autoCorrect={false} 
									blurOnSubmit={false} 
									onSubmitEditing={() => {
										this.focusNextField('email');
									}} 
									returnKeyType={"next"} 
									ref={input => {
										 this.inputs['name'] = input;
									}} />
							</Item>
							<Item>
								<Label>Email</Label>
								<Input 
									keyboardType="email-address" 
									autoCapitalize="none" 
									onChangeText={(value) => {
										this.registerForm.email = value, 
										this.validateRegisterForm()
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
										this.registerForm.password = value, 
										this.validateRegisterForm()
									}} 
									secureTextEntry={true} 
									blurOnSubmit={true} 
									ref={input => {
										 this.inputs['password'] = input;
									}} />
							</Item>
							<View style={{marginTop: 24}}>
								{ !this.state.valid && <Button block primary disabled>
									<Text>Create Account</Text>
								</Button> }
								{ this.state.valid && <Button block primary onPress={() => this.register(rootNav)}>
									<Text>Create Account</Text>
								</Button> }
							</View>
						</Form>
					</Content>
					<Spinner visible={this.state.loading} />
				</Container>
			</StyleProvider>
		)
		
	}
	
}
