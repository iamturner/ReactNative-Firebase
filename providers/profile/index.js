import firebase from './../../lib/firebase';

module.exports = {

	getUserProfile: () => {
		let user = firebase.auth().currentUser;
		return firebase.database().ref('/users').child(user.uid);
	}, 
	
	updateUserProfile: (name, location = null) => {
		let user = firebase.auth().currentUser;
		return firebase.database().ref('/users').child(user.uid).update({
			name: name, 
			location: location
		});
	}
	
}