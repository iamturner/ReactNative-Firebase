import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ActionSheetIOS, Alert } from 'react-native';
import { View, Button, List, Text, Colors, Container } from './../../theme';
import authProvider from './../../providers/auth';
import Icon from 'react-native-vector-icons/Ionicons';

export class Home extends Component {

	constructor(props, context) {
		super(props, context);
	}
	
	goToProfile() {
		this.props.navigator.push({
			screen: 'screen.Profile',
			title: 'Profile', 
			backButtonTitle: 'Back'
		});
	}
	
	goToAccountSettings() {
		this.props.navigator.push({
			screen: 'screen.AccountSettings',
			title: 'My Account', 
			backButtonTitle: 'Back'
		});
	}
	
	logOut() {
		if (Platform.OS === 'ios') {
			ActionSheetIOS.showActionSheetWithOptions({
				title: 'Are you sure you want to sign out?', 
				options: ['Sign Out', 'Cancel'],
				destructiveButtonIndex: 0,
				cancelButtonIndex: 1,
			}, (buttonIndex) => {
				if (buttonIndex === 0) { 
					authProvider.logoutUser();
				}
			});
		} else {
			Alert.alert('Sign Out', 'Are you sure you want to sign out?', [{
				text: 'Cancel', onPress: () => {/* Cancelled */}, style: 'cancel'}, {
				text: 'OK', onPress: () => authProvider.logoutUser()
			}], { cancelable: false });
		}
	}

	render() {
		
		return (
			
			<Container>
			
				<List style={{ marginTop: 16 }}>
					<List.Item>
						<TouchableOpacity style={{ paddingVertical: 7, flexDirection: 'row', alignItems: 'center' }} onPress={() => this.goToProfile()}>
							<Text style={{ flex: 1 }}>User Profile</Text>
							<Icon name="ios-arrow-forward" size={22} style={{marginTop: 4}} />
						</TouchableOpacity>
					</List.Item>
					<List.Item style={{ borderBottomWidth: 0 }}>
						<TouchableOpacity style={{ paddingVertical: 7, flexDirection: 'row', alignItems: 'center' }} onPress={() => this.goToAccountSettings()}>
							<Text style={{ flex: 1 }}>Account Settings</Text>
							<Icon name="ios-arrow-forward" size={22} style={{marginTop: 4}} />
						</TouchableOpacity>
					</List.Item>
				</List>
			
				<Button style={{ marginTop: 24, borderRadius: 0, backgroundColor: 'white' }} onPress={() => this.logOut()}>
					<Button.Text style={{ color: Colors.danger }}>Sign Out</Button.Text>
				</Button>
				
			</Container>
			
		);
		
	}
	
}
