import React, { Component } from "react";
import { Modal, StatusBar } from "react-native";
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
	Header, 
	Left, 
	Right, 
	Body, 
	Title 
} from "native-base";
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';

import styles from "./styles";

export class ForgotPassword extends Component {
	
	constructor(props, context){
        super(props, context);
        this.state = { 
            visible: false
        }
		this.onClose = () => props.onClose()
    }
	
	render() {
		return (
			<View>
				<Modal animationType="slide" transparent={false} visible={this.props.visible === true}>
					<StyleProvider style={getTheme(myTheme)}>
						<Container style={styles.container}>
							<Header>
								<StatusBar barStyle="dark-content"/>
								<Left>
									<Button transparent onPress={() => this.hide()}>
										<Text>Cancel</Text>
									</Button>
								</Left>
								<Body>
									<Title>Forgot Password</Title>
								</Body>
								<Right />
							</Header>
							<Content padder>
								<Form rounded>
									<View listHeading noPadding style={{marginBottom: 16}}>
										<Text>Please enter your email address and we will send you a link to reset your password.</Text>
									</View>
									<Item fixedLabel first last>
										<Label>Email</Label>
										<Input keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
									</Item>
									<View style={{marginTop: 24}}>
										<Button block primary>
											<Text>Submit</Text>
										</Button>
									</View>
								</Form>
							</Content>
						</Container>
					</StyleProvider>
				</Modal>
			</View>
		)
	}
	
	hide() {
		this.onClose()
        this.setState({
            visible: false
        })
    }
	
}
