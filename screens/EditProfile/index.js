import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { View, Button, List, Input, Text, Container, Colors } from './../../theme';
import profileProvider from './../../providers/profile';

export class EditProfile extends Component {

	static navigatorButtons = {
		leftButtons: [{
			title: 'Cancel', 
			id: 'cancel'
		}], 
		rightButtons: [{
			title: 'Save', 
			id: 'save', 
			buttonFontSize: 18, 
			buttonFontWeight: 'bold'
		}]
	}
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			valid: false, 
			loading: false, 
			userProfile: null
        }
		this.inputs = {};
		/* Listen for nav bar events, (e.g. clicking the 'Cancel' button) */
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		profileProvider.getUserProfile().on('value', userProfileSnapshot => {
			this.setState({
				userProfile: JSON.parse(JSON.stringify(userProfileSnapshot.val()))
        	}, () => {
				this.validateUserProfileForm();
			});
		});
	}
	
	onNavigatorEvent(event) {
		/* Check if event is a button press */
		if (event.type == 'NavBarButtonPress') {
			/* Check ID of button pressed */
			if (event.id == 'cancel') {
				/* Dismiss Modal */
				this.props.navigator.dismissModal();
			} else if (event.id == 'save') {
				this.updateProfile();
			}
		}
		
	}

	focusNextField(key) {
		this.inputs[key].focus();
	}

	validateUserProfileForm() {
		let name = this.state.userProfile.name;
		this.setState({ 
			valid: (name) ? true : false
		});
	}

	updateProfile() {
		if (!this.state.valid || this.state.loading) {
			return false;
		}
		let name = this.state.userProfile.name;
		let location = this.state.userProfile.location;
		this.setState({ loading: true }, () => {
			profileProvider.updateUserProfile(name, location).then(() => {
				this.setState({ loading: false }, () => {
					this.props.navigator.dismissModal();
				});
			}, error => {
				this.setState({ loading: false }, () => {
					Alert.alert('Error', error.message, [{text: 'OK'}], { cancelable: false });
				});
			});
		});
	}

	render() {
		
		return (
			
			<Container>
			
				<View style={{ marginTop: 20, paddingHorizontal: 16 }}>
					<Text style={{ fontSize: 14, color: Colors.text }}>Personal Information</Text>
				</View>
			
				{ this.state.userProfile && <List style={{ marginTop: 10 }}>
					<List.Item>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text>Name</Text>
							<Input style={{ 
								flex: 1, 
								borderRadius: 0, 
								backgroundColor: 'transparent' }}
								value={this.state.userProfile.name}
								onChangeText={(value) => {
									let profile = this.state.userProfile;
										profile.name = value;
									this.setState({
										userProfile: profile
									});
									this.validateUserProfileForm();
								}}
								onSubmitEditing={() => {
									this.focusNextField('location')
								}}
								inputRef={input => {
                                    this.inputs['name'] = input;
                                }}>
							</Input>
						</View>
					</List.Item>
					<List.Item style={{ borderBottomWidth: 0 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 16 }}>Location</Text>
							<Input style={{ 
								flex: 1, 
								borderRadius: 0, 
								backgroundColor: 'transparent' }}
								value={this.state.userProfile.location}
								onChangeText={(value) => {
									let profile = this.state.userProfile;
										profile.location = value;
									this.setState({
										userProfile: profile
									});
									this.validateUserProfileForm();
								}}
								inputRef={input => {
                                    this.inputs['location'] = input;
                                }}>
							</Input>
						</View>
					</List.Item>
				</List> }
			
			</Container>
			
		);
		
	}
	
}
