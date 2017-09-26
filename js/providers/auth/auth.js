import firebase from './../../lib/firebase';

module.exports = {
	
	loginWithEmail: (email, password) => {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}, 
	
	logoutUser: () => {
        return firebase.auth().signOut();
    }
	
}
