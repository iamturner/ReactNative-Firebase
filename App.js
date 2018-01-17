import React, { Component } from "react";
import { View } from './theme';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

import firebase from './lib/firebase';

firebase.auth().onAuthStateChanged((user) => {
	
	/* Check if user is authenticated */
	Navigation.startSingleScreenApp({
		screen: {
			screen: (user ? 'screen.Home' : 'screen.Login'),
			title: (user ? ' Home ' : ' Login '), 
			navigatorStyle: {
				navBarTextColor: '#28404f', 
				navBarBackgroundColor: '#f8f8f8', 
				navBarNoBorder: true
			}
		}
	})
	
});

registerScreens();

console.disableYellowBox = true;