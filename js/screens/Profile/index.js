import React, { Component } from "react";
import { 
	View, 
	Container, 
	Content, 
	List, 
	ListItem, 
	Button, 
	Text, 
	StyleProvider, 
	Right, 
	Separator, 
	connectStyle
} from "native-base";
import { ActivityIndicator } from 'react-native';
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';
import { EditProfile } from "./../EditProfile";
import profileProvider from "./../../providers/profile/profile";

//import styles from "./styles";

export default class Profile extends Component {
	
	userProfile: any;
	
	static navigationOptions = ({ navigation }) => ({
		title: 'Profile', 
		headerStyle: {
			backgroundColor: '#f8f8f8'
		}, 
		headerTitleStyle: {
			color: '#28404F'
		}, 
		headerRight: (
			<Button transparent onPress={() => _this.toggleEditProfile()}>
				<Text bold>Edit</Text>
			</Button>
		), 
		headerBackTitle: 'Back'
	});
	
	constructor(props) {
		super(props);
		this.state = {
            editProfileOpen: false, 
			userProfile: null, 
			test: null
        }
	}

	componentDidMount() {
		_this = this;
		profileProvider.getUserProfile().on('value', userProfileSnapshot => {
			this.setState({
				userProfile: userProfileSnapshot.val()
        	});
		});
	}
	
	render() {
		
		const rootNav = this.props.screenProps.rootNavigation;
		const styles = this.props.style;
		
		return (
			<StyleProvider style={getTheme(myTheme)}>
				<Container>
					{ !this.state.userProfile && <View style={{marginTop: 24}}>
						<ActivityIndicator />
					</View> }
					{ this.state.userProfile && <Content>
						<View list>
							<View listHeading>
								<Text>Personal Information</Text>
							</View>
							<List>
								<ListItem button>
									<Text>Name</Text>
									<Right>
										<Text note>{ this.state.userProfile.name }</Text>
									</Right>
								</ListItem>
								<ListItem last noBorder>
									<Text>Location</Text>
									<Right>
										<Text note>{ this.state.userProfile.location }</Text>
									</Right>
								</ListItem>
							</List>
						</View>
						<EditProfile 
							visible={this.state.editProfileOpen} 
							profile={this.state.userProfile} 
							onCancel={()=>this.toggleEditProfile()} 
							onSubmit={()=>this.toggleEditProfile()} />
					</Content> }
				</Container> 
			</StyleProvider>
		)
		
	}
	
	toggleEditProfile() {
		if (this.state.userProfile) {
			this.setState({
            	editProfileOpen: !this.state.editProfileOpen
        	});
		}
	}
	
}
