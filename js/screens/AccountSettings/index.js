import React, { Component } from "react";
import { Alert, AlertIOS } from "react-native";
import { 
	View, 
	Container, 
	Content, 
	List, 
	ListItem, 
	Button, 
	Text, 
	StyleProvider, 
	Body, 
	Right, 
	Icon, 
	Separator, 
	Toast
} from "native-base";
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';
import Spinner from 'react-native-loading-spinner-overlay';
import authProvider from "./../../providers/auth/auth";

export default class AccountSettings extends Component {
	
	static navigationOptions = ({ navigation }) => ({
		title: 'Account Settings', 
		headerStyle: {
			backgroundColor: '#f8f8f8'
		}, 
		headerTitleStyle: {
			color: '#28404F'
		}, 
		headerBackTitle: 'Back'
	});
	
	constructor(props) {
		super(props);
		this.state = {
			loading: false
        }
	}
	
	goToChangeEmail() {
		this.props.navigation.navigate('ChangeEmail');
	}
	
	goToChangePassword() {
		this.props.navigation.navigate('ChangePassword');
	}
	
	deleteAccount(rootNav) {
		AlertIOS.prompt(
			'Password Confirmation',
			'Please confirm your password to delete your account',
			password => {
				this.setState({ loading: true }, () => {
					authProvider.deleteAccount(password).then(() => {
						this.setState({ loading: false }, () => {
							setTimeout(() => {
								Toast.show({
									text: 'Your account has been deleted.',
									duration: 3000, 
									position: 'bottom'
								});
								rootNav.navigate('LoginStack');
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
					<Content>
						<View list>
							<List>
								<ListItem icon button onPress={() => this.goToChangeEmail() }>
									<Body>
										<Text>Change Email</Text>
									</Body>
									<Right>
										<Icon name="arrow-forward" />
									</Right>
								</ListItem>
								<ListItem icon last noBorder button onPress={() => this.goToChangePassword() }>
									<Body>
										<Text>Change Password</Text>
									</Body>
									<Right>
										<Icon name="arrow-forward" />
									</Right>
								</ListItem>
							</List>
						</View>
						<View listHeading>
							<Text>Some sort of warning about deleting your account.</Text>
						</View>
						<Button transparent full danger onPress={() => this.deleteAccount(rootNav)}>
							<Text>Delete Account</Text>
						</Button>
					</Content>
					<Spinner visible={this.state.loading} />
				</Container>
			</StyleProvider>
		)
		
	}
	
}
