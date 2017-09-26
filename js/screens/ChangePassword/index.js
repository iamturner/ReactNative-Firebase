import React, { Component } from "react";
import { View } from "react-native";
import { 
	Container, 
	Content, 
	StyleProvider, 
	Form,
	Item, 
	Label, 
	Input, 
	Button, 
	Text
} from "native-base";
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';

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
	}
	
	render() {
		
		const rootNav = this.props.screenProps.rootNavigation;
		
		return (
			<StyleProvider style={getTheme(myTheme)}>
				<Container>
					<Content padder>
						<Form rounded>
							<Item fixedLabel first>
								<Label>Current</Label>
								<Input secureTextEntry={true} />
							</Item>
							<Item fixedLabel last>
								<Label>New</Label>
								<Input secureTextEntry={true} />
							</Item>
							<Button block primary submit>
								<Text>Submit</Text>
							</Button>
						</Form>
					</Content>
				</Container>
			</StyleProvider>
		)
		
	}
	
}
