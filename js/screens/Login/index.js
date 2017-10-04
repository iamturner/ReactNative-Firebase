import React, { Component } from "react";
import { View } from "react-native";
import { 
	Container, 
	Content, 
	Button, 
	Text, 
	StyleProvider 
} from "native-base";
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';
import Spinner from 'react-native-loading-spinner-overlay';

import firebase from './../../lib/firebase';

import styles from "./styles";

export default class Login extends Component {
	
	static navigationOptions = {
		title: 'Login', 
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
	}
	
	goToLoginWithEmail(loader) {
		this.props.navigation.navigate('LoginWithEmail');
	}
	
	goToRegister() {
		this.props.navigation.navigate('Register');
	}
	
	render() {
		
		return (
			<StyleProvider style={getTheme(myTheme)}>
				<Container style={styles.container}>
					<Content padder style={{paddingTop: 20}}>
						<View style={styles.padding}>
							<Button block style={{backgroundColor: '#dd4b39'}}>
								<Text>Sign in with Google</Text>
							</Button>
						</View>
						<View style={styles.padding}>
							<Button block style={{backgroundColor: '#55acee'}}>
								<Text>Sign in with Twitter</Text>
							</Button>
						</View>
						<View style={styles.padding}>
							<Button block style={{backgroundColor: '#3b5999'}}>
								<Text>Sign in with Facebook</Text>
							</Button>
						</View>
						<View style={styles.padding}>
							<Button block primary onPress={() => this.goToLoginWithEmail()}>
								<Text>Sign in with Email</Text>
							</Button>
						</View>
						<View style={[styles.padding, {marginTop: 20}]}>
							<Button block bordered onPress={() => this.goToRegister()}>
								<Text>Create New Account</Text>
							</Button>
						</View>
					</Content>
				</Container>
			</StyleProvider>
		)
		
	}
	
}
