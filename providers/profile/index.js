import firebase from './../../lib/firebase';

module.exports = {

	getUserProfile: () => {
		let user = firebase.auth().currentUser;
		return firebase.database().ref('/users').child(user.uid);
	}, 
	
	updateUserProfile: async (name, location = null, photo = null) => {
		/* Check for new photo (`assets-library://` is for iOS, `content://` for Android) */
		if (photo != null && (photo.startsWith('assets-library://') || photo.startsWith('content://'))) {
			/* If there's a new photo, upload it first */
			const upload = () => {
				return new Promise((resolve, reject) => {
					/* Upload photo to Firebase storage */
					let storageRef = firebase.storage().ref();
					let filename = Math.floor(Date.now() / 1000);
					let imageRef = storageRef.child(`profile_images/${filename}.jpg`);
					
					let metadata = {
						cacheControl: 'public,max-age=3600', // Cache image for 1 hour 
						contentType: 'image/jpeg'
					};

					imageRef.put(photo, metadata).then((snapshot)=> {
						resolve(snapshot);
					}, error => {
						// Handle error
						reject(error);
					});	
				});
			}
			await upload().then((response)=> {
				photo = response.downloadUrl;
			});
		}
		let user = firebase.auth().currentUser;
		return firebase.database().ref('/users').child(user.uid).update({
			name: name, 
			location: location, 
			photo: photo
		});
	}, 
	
	saveUserPhoto(image: string = null) {
		let storageRef = firebase.storage().ref();
		let filename = Math.floor(Date.now() / 1000);
		let imageRef = storageRef.child(`profile_images/${filename}.jpg`);
		
		let metadata = {
			cacheControl: 'public,max-age=3600', // Cache image for 1 hour 
			contentType: 'image/jpeg'
		};
		
		return imageRef.putString(image, metadata).then((snapshot)=> {
			return snapshot;
		});
	}
	
}