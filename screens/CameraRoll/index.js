import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Image, ActivityIndicator, CameraRoll, ScrollView, Dimensions } from 'react-native';
import { View, Container, Colors } from './../../theme';
import Icon from 'react-native-vector-icons/Ionicons';

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

	selectPhoto(photo) {
		this.props.onSelectedPhoto({
			photo: photo != null ? photo.node.image.uri : null
		});
		this.props.navigator.dismissModal();
	}

	render() {
		
		return (
			
			<Container>
			
				{ !this.state.photos && <View style={{marginTop: 24}}>
					<ActivityIndicator />
				</View> }
			
				{ this.state.photos && <ScrollView>
			
					<View style={styles.photosContainer}>
			
						<TouchableOpacity style={[styles.photo, styles.photoDelete]} onPress={() => this.selectPhoto(null)}>
							<Icon name="md-trash" size={40} style={{color: Colors.danger}} />
						</TouchableOpacity>
			
						{ this.state.photos.map((p, i) => { return (
							<TouchableOpacity key={i} style={styles.photo} onPress={() => this.selectPhoto(p)}>
								<Image style={styles.photoImage} source={{ uri: p.node.image.uri }} />
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
		flexDirection: 'row', 
		paddingHorizontal: 0.5
	}, 
	photo: {
		width: (Dimensions.get('window').width-1)/3, 
		height: (Dimensions.get('window').width-1)/3, 
		padding: 0.5
	}, 
	photoImage: {
		flex: 1, 
		width: null, 
        height: null
	}, 
	photoDelete: {
		alignItems: 'center', 
		justifyContent: 'center'
	}
});