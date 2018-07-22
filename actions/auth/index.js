import firebase from './../../lib/firebase';

module.exports = {
	
	/* Login With Email */
	
	loginWithEmail: (email, password) => {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}, 
	
	/* Logout */
	
	logoutUser: () => {
        return firebase.auth().signOut();
    }, 
	
	/* Recover Password */

    recoverPassword: (email) => {
        return firebase.auth().sendPasswordResetEmail(email);
    }, 
	
	/* Register New User */
    
	register: (name, email, password) => {
		return firebase.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
			firebase.database().ref('/users').child(newUser.uid).set({
				name: name, 
				email: email
			});
		});
    }, 
	
	/* Update Password */

    updatePassword: (currentPassword, newPassword) => {
		let user = firebase.auth().currentUser;
		return firebase.auth().signInWithEmailAndPassword(user.email, currentPassword).then(() => {
			return user.updatePassword(newPassword);
		});
    }, 
	
	/* Update Email Address */

    updateEmail: (newEmail, password) => {
		let user = firebase.auth().currentUser;
		return firebase.auth().signInWithEmailAndPassword(user.email, password).then(() => {
			firebase.database().ref('/users').child(user.uid).update({
				email: newEmail
			});
            return user.updateEmail(newEmail);
		});
    }, 
	
	/* Delete User Account */
    
	deleteAccount: (password) => {
		let user = firebase.auth().currentUser;
		return firebase.auth().signInWithEmailAndPassword(user.email, password).then((user) => {
			firebase.database().ref('/users').child(user.uid).remove();
            return user.delete();
		});
    }
	
}
