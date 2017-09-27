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
	
	//updateUserProfile: (name, location) => {
		/*return this.userProfile.update({
			name: name, 
			location: location
		});*/
	//}
	
	/*getUserProfile: () => {
		return firebase.auth().onAuthStateChanged(user => {
			if (user){
				return firebase.database().ref('/users').child(user.uid);
			}
		});
	}*/
	
}