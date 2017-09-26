import React, { Component } from "react";
import { Keyboard } from "react-native";
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

import styles from "./styles";

export default class Register extends Component {
	
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
	
	render() {
		return (
			<StyleProvider style={getTheme(myTheme)}>
				<Container>
					<Content padder>
						<Form rounded>
							<Item fixedLabel first>
								<Label>Name</Label>
								<Input />
							</Item>
							<Item fixedLabel>
								<Label>Email</Label>
								<Input keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
							</Item>
							<Item fixedLabel last>
								<Label>Password</Label>
								<Input secureTextEntry={true} />
							</Item>
							<View style={{marginTop: 24}}>
								<Button block primary>
									<Text>Create Account</Text>
								</Button>
							</View>
						</Form>
					</Content>
				</Container>
			</StyleProvider>
		)
	}
	
}
