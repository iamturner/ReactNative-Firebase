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
	Body, 
	Right, 
	Icon, 
	Separator
} from "native-base";
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';

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
	}
	
	goToChangeEmail() {
		this.props.navigation.navigate('ChangeEmail');
	}
	
	goToChangePassword() {
		this.props.navigation.navigate('ChangePassword');
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
						<Button transparent full danger>
							<Text>Delete Account</Text>
						</Button>
					</Content>
				</Container>
			</StyleProvider>
		)
		
	}
	
}
