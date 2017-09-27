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
			loading: false
        }
		this.registerForm = {
			name: null, 
			email: null, 
			password: null
		}
    }
	
	register(rootNav) {
		let name = this.registerForm.name;
		let email = this.registerForm.email;
		let password = this.registerForm.password;
		if (name == null || email == null || password == null) {
			return false;
		}
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
	
	render() {
		
		const rootNav = this.props.screenProps.rootNavigation;
		
		return (
			<StyleProvider style={getTheme(myTheme)}>
				<Container>
					<Content padder>
						<Form rounded>
							<Item fixedLabel first>
								<Label>Name</Label>
								<Input 
									onChangeText={(value) => this.registerForm.name = value} 
									autoCorrect={false} />
							</Item>
							<Item fixedLabel>
								<Label>Email</Label>
								<Input 
									keyboardType="email-address" 
									autoCapitalize="none" 
									onChangeText={(value) => this.registerForm.email = value} 
									autoCorrect={false} />
							</Item>
							<Item fixedLabel last>
								<Label>Password</Label>
								<Input 
									onChangeText={(value) => this.registerForm.password = value} 
									secureTextEntry={true} />
							</Item>
							<View style={{marginTop: 24}}>
								<Button block primary onPress={() => this.register(rootNav)}>
									<Text>Create Account</Text>
								</Button>
							</View>
						</Form>
					</Content>
					<Spinner visible={this.state.loading} />
				</Container>
			</StyleProvider>
		)
		
	}
	
}
