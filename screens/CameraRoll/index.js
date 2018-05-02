import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Image, ActivityIndicator, CameraRoll, ScrollView, Dimensions } from 'react-native';
import { View, Container, Colors } from './../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

export class CameraRollPage extends Component {

	static navigatorButtons = {
		leftButtons: [{
			title: 'Cancel', 
			id: 'cancel'
		}]
	}
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			photos: null
        };
		/* Listen for nav bar events, (e.g. clicking the 'Cancel' button) */
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}
	
	componentWillMount() {
		CameraRoll.getPhotos({
			first: 20,
			assetType: 'Photos'
		}).then(response => {
			this.setState({ photos: response.edges });
		}).catch((err) => {
			//Error Loading Images
		});
	}

	onNavigatorEvent(event) {
		/* Check if event is a button press */
		if (event.type == 'NavBarButtonPress') {
			/* Check ID of button pressed */
			if (event.id == 'cancel') {
				/* Dismiss Modal */
				this.props.navigator.dismissModal();
			}
		}
	}
	
	async selectPhoto(photo, resize = false) {
		/* Resize photo if required */
		if (photo != null && resize == true) {
			const resize = () => {
				return new Promise((resolve, reject) => {
					ImageResizer.createResizedImage(photo.uri, 240, 240, 'JPEG', 90, 0).then((response) => {
						resolve(response);
					}).catch((err) => {
						reject(err);
					});
				});
			}
			await resize().then((response)=> {
				photo.uri = response.uri;
			}, error => {
				// Handle error
			});	
		}
		this.props.onSelectedPhoto({
			photo: photo != null ? photo.uri : null
		});
		this.props.navigator.dismissModal();
	}

	takePicture() {
		let options = {
			maxWidth: 240, 
			maxHeight: 240, 
			quality: 0.9
		}
		/* Launch Camera */
		ImagePicker.launchCamera(options, (response)  => {
		  	this.selectPhoto(response);
		});
	};

	render() {
		
		return (
			
			<Container>
			
				{ !this.state.photos && <View style={{marginTop: 24}}>
					<ActivityIndicator />
				</View> }
			
				{ this.state.photos && <ScrollView>
			
					<View style={styles.photosContainer}>
			
						<TouchableOpacity style={styles.photo} onPress={() => this.takePicture()}>
							<Icon name="ios-camera-outline" size={44} style={styles.cameraIcon} />
						</TouchableOpacity>
			
						{ this.state.photos.map((photo, index) => { return (
							<TouchableOpacity key={index} style={styles.photo} onPress={() => this.selectPhoto(photo.node.image, true)}>
								<Image style={styles.photoImage} source={{ uri: photo.node.image.uri }} />
							</TouchableOpacity>
						); })}
						
					</View>

				</ScrollView> }
			
			</Container>
			
		);
		
	}
	
}

const styles = StyleSheet.create({
	photosContainer: {
		flexWrap: 'wrap', 
		flexDirection: 'row'
	}, 
	photo: {
		width: (Dimensions.get('window').width)/3, 
		height: (Dimensions.get('window').width)/3, 
		justifyContent: 'center', 
		padding: 1
	}, 
	photoImage: {
		flex: 1, 
		width: null, 
        height: null
	}, 
	cameraIcon: {
		alignSelf: 'center', 
		color: Colors.text
	}
});
