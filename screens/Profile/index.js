import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { View, List, Text, Colors, Container } from './../../theme';
import profileProvider from './../../providers/profile';

export class Profile extends Component {

	static navigatorButtons = {
		rightButtons: [{
			title: 'Edit', 
			id: 'edit'
		}]
	}
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			userProfile: null
        }
		/* Listen for nav bar events, (e.g. clicking the 'Edit' button) */
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		profileProvider.getUserProfile().on('value', userProfileSnapshot => {
			this.setState({
				userProfile: userProfileSnapshot.val()
        	});
		});
	}
	
	onNavigatorEvent(event) {
		/* Check if event is a button press */
		if (event.type == 'NavBarButtonPress') {
			/* Check ID of button pressed */
			if (event.id == 'edit') {
				/* Open Modal */
				this.props.navigator.showModal({
					screen: 'screen.EditProfile',
					title: 'Edit Profile', 
					navigatorStyle: {
						navBarTextColor: Colors.primary, 
						navBarBackgroundColor: '#f8f8f8', 
						navBarNoBorder: true
					}
				});
			}
			
		}
		
	}

	render() {
		
		return (
			
			<Container>
			
				{ !this.state.userProfile && <View style={{marginTop: 24}}>
					<ActivityIndicator />
				</View> }
			
				{ this.state.userProfile && <View>
			
					<View style={{ marginTop: 20, paddingHorizontal: 16 }}>
						<Text style={{ fontSize: 14, color: Colors.text }}>Personal Information</Text>
					</View>

					<List style={{ marginTop: 10 }}>
						<List.Item>
							<View style={{ paddingVertical: 11, flexDirection: 'row' }}>
								<Text style={{ flex: 1 }}>Name</Text>
								<Text style={{ color: '#aeacb4' }}>{ this.state.userProfile.name }</Text>
							</View>
						</List.Item>
						<List.Item style={{ borderBottomWidth: 0 }}>
							<View style={{ paddingVertical: 11, flexDirection: 'row' }}>
								<Text style={{ flex: 1 }}>Location</Text>
								<Text style={{ color: '#aeacb4' }}>{ this.state.userProfile.location }</Text>
							</View>
						</List.Item>
					</List>
			
				</View> }
			
			</Container>
			
		);
		
	}
	
}
