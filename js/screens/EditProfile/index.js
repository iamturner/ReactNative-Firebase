import React, { Component } from "react";
import { Modal, StatusBar } from "react-native";
import { 
	Container, 
	Content, 
	Button, 
	Text, 
	StyleProvider, 
	Header, 
	Left, 
	Right, 
	Body, 
	Title, 
	View, 
	Form, 
	Item, 
	Label, 
	Input
} from "native-base";
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';

import styles from "./styles";

export class EditProfile extends Component {
	
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
						<Container>
							<Header>
								<StatusBar barStyle="dark-content"/>
								<Left>
									<Button transparent onPress={() => this.hide()}>
										<Text>Cancel</Text>
									</Button>
								</Left>
								<Body>
									<Title>Edit Profile</Title>
								</Body>
								<Right>
									<Button transparent>
										<Text bold>Save</Text>
									</Button>
								</Right>
							</Header>
							<Content>
								<View list>
									<View listHeading>
										<Text>Personal Information</Text>
									</View>
									<Form>
										<Item first>
											<Label>Name</Label>
											<Input />
										</Item>
										<Item last>
											<Label>Location</Label>
											<Input />
										</Item>
									</Form>
								</View>
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
