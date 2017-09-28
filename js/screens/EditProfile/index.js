import React, { Component } from "react";
import { Modal, StatusBar, ActivityIndicator, Alert } from "react-native";
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
	Input, 
	Toast
} from "native-base";
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';
import Spinner from 'react-native-loading-spinner-overlay';
import profileProvider from "./../../providers/profile/profile";

import styles from "./styles";

export class EditProfile extends Component {
	
	constructor(props, context){
        super(props, context);
        this.state = { 
            visible: false, 
			loading: false, 
			valid: true, 
			userProfile: JSON.parse(JSON.stringify(props.profile))
        }
    }
	
	updateProfile() {
		let name = this.state.userProfile.name;
		let location = this.state.userProfile.location;
		this.setState({ loading: true }, () => {
			profileProvider.updateUserProfile(name, location).then(() => {
				this.setState({ loading: false }, () => {
					Toast.show({
						text: 'Your profile has been updated.',
						duration: 3000, 
						position: 'bottom'
					});
					this.props.onSubmit();
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
	
	cancel() {
		this.setState({
			userProfile: JSON.parse(JSON.stringify(this.props.profile)), 
			visible: false, 
			valid: true
		});
		this.props.onCancel();
	}
	
	validateUserProfileForm() {
		let name = this.state.userProfile.name;
		this.setState({ 
			valid: (name) ? true : false
		});
	}
	
	render() {
		return (
			<View>
				<Modal animationType="slide" visible={this.props.visible === true}>
					<StyleProvider style={getTheme(myTheme)}>
						<Container>
							<Header>
								<StatusBar barStyle="dark-content"/>
								<Left>
									<Button transparent onPress={() => this.cancel()}>
										<Text>Cancel</Text>
									</Button>
								</Left>
								<Body>
									<Title>Edit Profile</Title>
								</Body>
								<Right>
									{ !this.state.valid && <Button transparent disabled>
										<Text bold>Save</Text>
									</Button> }
									{ this.state.valid && <Button transparent onPress={() => this.updateProfile()}>
										<Text bold>Save</Text>
									</Button> }
								</Right>
							</Header>
							<Content>
								{ !this.state.userProfile && <View style={{marginTop: 24}}>
									<ActivityIndicator />
								</View> }
								{ this.state.userProfile && <View list>
									<View listHeading>
										<Text>Personal Information</Text>
									</View>
									<Form>
										<Item first>
											<Label>Name</Label>
											<Input 
												value={this.state.userProfile.name} 
												onChangeText={(value) => {
													let profile = this.state.userProfile;
														profile.name = value;
													this.setState({
														userProfile: profile
													});
								 					this.validateUserProfileForm();
												}} />
										</Item>
										<Item last>
											<Label>Location</Label>
											<Input 
												value={this.state.userProfile.location} 
												onChangeText={(value) => {
													let profile = this.state.userProfile;
														profile.location = value;
													this.setState({
														userProfile: profile
													})
												}} />
										</Item>
									</Form>
								</View> }
							</Content>
							<Spinner visible={this.state.loading} />
						</Container>
					</StyleProvider>
				</Modal>
			</View>
		)
	}
	
}
