import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { StatusBar } from "react-native";
import { Root } from "native-base";

import Login from "./screens/Login";
import LoginWithEmail from "./screens/LoginWithEmail";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import AccountSettings from "./screens/AccountSettings";
import ChangeEmail from "./screens/ChangeEmail";
import ChangePassword from "./screens/ChangePassword";

import firebase from './lib/firebase';

/* Navigation stack for unauthorized users - Login, Sign Up, etc. */

const LoginNavigator = StackNavigator({
	Login: { 
		screen: Login
	},
	LoginWithEmail: { 
		screen: LoginWithEmail
	},
	Register: { 
		screen: Register
	}
}, {
	index: 0,
	initialRouteName: "Login"
});

/* Navigation stack for authorized users */

const AuthNavigator = StackNavigator({
	Home: { 
		screen: Home
	}, 
	Profile: {
		screen: Profile
	}, 
	AccountSettings: {
		screen: AccountSettings
	}, 
	ChangeEmail: {
		screen: ChangeEmail
	}, 
	ChangePassword: {
		screen: ChangePassword
	}
}, {
	index: 0,
	initialRouteName: "Home"
});

/* Parent navigation stack */

export default class App extends Component {

	constructor(props, context) {
        super(props, context);
        this.state = {
            loggedUser: null
        }
    }
    
    componentDidMount = async () => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			this.setState({ loggedUser: user });
			/*if (!user) {
                unsubscribe();
            } else {
                unsubscribe();
            }*/
		});
    }
	
	render() {

		const AppNavigator = StackNavigator({
			LoginStack: { 
				screen: ({ navigation }) => <LoginNavigator screenProps={{ rootNavigation: navigation }} />, 
				navigationOptions: ({navigation}) => ({
					header: null, 
					gesturesEnabled: false
				})
			},
			AuthStack: { 
				screen: ({ navigation }) => <AuthNavigator screenProps={{ rootNavigation: navigation }} />, 
				navigationOptions: ({navigation}) => ({
					header: null, 
					gesturesEnabled: false
				})
			}
		}, {
			index: 0,
			initialRouteName: !this.state.loggedUser ? "LoginStack" : "AuthStack",
			transitionConfig: () => ({
				transitionSpec: {
					duration: 0
				}
			})
		});
		
		return (
			<Root>
				<StatusBar barStyle="dark-content" />
				<AppNavigator />
			</Root>
		)
		
	}
	
}
