import React, { Component } from "react";
import { 
	View, 
	Container, 
	Content, 
	List, 
	ListItem, 
	Button, 
	Text, 
	StyleProvider, 
	ActionSheet, 
	Body, 
	Right, 
	Icon
} from "native-base";
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';
import authProvider from "./../../providers/auth/auth";

//import styles from "./styles";

export default class Home extends Component {
	
	static navigationOptions = {
		title: 'Home', 
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
	
	logOut(rootNav) {
		ActionSheet.show({
			options: ["Sign Out", "Cancel"],
			cancelButtonIndex: 1,
			destructiveButtonIndex: 0,
			title: "Are you sure you want to sign out?"
		}, buttonIndex => {
			if (buttonIndex == 0) {
				authProvider.logoutUser();
				rootNav.navigate('LoginStack');
			}
		});
	}
	
	goToProfile() {
		this.props.navigation.navigate('Profile');
	}
	
	goToAccountSettings() {
		this.props.navigation.navigate('AccountSettings');
	}
	
	render() {
		
		const rootNav = this.props.screenProps.rootNavigation;
		
		return (
			<StyleProvider style={getTheme(myTheme)}>
				<Container>
					<Content>
						<View list>
							<List>
								<ListItem icon button onPress={() => this.goToProfile()}>
									<Body>
										<Text>User Profile</Text>
									</Body>
									<Right>
										<Icon name="arrow-forward" />
									</Right>
								</ListItem>
								<ListItem icon last noBorder button onPress={() => this.goToAccountSettings()}>
									<Body>
										<Text>Account Settings</Text>
									</Body>
									<Right>
										<Icon name="arrow-forward" />
									</Right>
								</ListItem>
							</List>
						</View>
						<Button transparent full danger onPress={() => this.logOut(rootNav)}>
							<Text>Sign Out</Text>
						</Button>
					</Content>
				</Container>
			</StyleProvider>
		)
		
	}
	
}

/*<View style={[styles.list, {marginTop: 27}]}>
	<Button transparent full danger onPress={() => this.logOut(rootNav)}>
		<Text>Sign Out</Text>
	</Button>
</View>*/