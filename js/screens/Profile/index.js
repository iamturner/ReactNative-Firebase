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
import getTheme from './../../../native-base-theme/components';
import myTheme from './../../../native-base-theme/variables/myTheme';
import { EditProfile } from "./../EditProfile";

//import styles from "./styles";

export default class Profile extends Component {
	
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
				<Text>Edit</Text>
			</Button>
		), 
		headerBackTitle: 'Back'
	});
	
	constructor(props) {
		super(props);
		this.state = {
            editProfileOpen: false
        }
	}

	componentDidMount() {
		_this = this;
	}
	
	render() {
		
		const rootNav = this.props.screenProps.rootNavigation;
		const styles = this.props.style;
		
		return (
			<StyleProvider style={getTheme(myTheme)}>
				<Container>
					<Content>
						<View list>
							<View listHeading>
								<Text>Personal Information</Text>
							</View>
							<List>
								<ListItem button>
									<Text>Name</Text>
									<Right>
										<Text note></Text>
									</Right>
								</ListItem>
								<ListItem last noBorder>
									<Text>Location</Text>
									<Right>
										<Text note></Text>
									</Right>
								</ListItem>
							</List>
						</View>
					</Content>
					<EditProfile visible={this.state.editProfileOpen} onClose={()=>this.toggleEditProfile()} />
				</Container>
			</StyleProvider>
		)
		
	}
	
	toggleEditProfile() {
		this.setState({
            editProfileOpen: !this.state.editProfileOpen
        });
	}
	
}

/*<Separator style={{ marginTop: 11 }}>
							<Text>PERSONAL INFORMATION</Text>
						</Separator>*/