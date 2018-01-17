import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';

export class Toast extends React.Component {
    
    constructor(props, context) {
        
		super(props, context);
		
		/*this.state = {
            isShow: false, 
            text: null, 
			duration: 2000
        }
		
		this.animateToast = {
            opacity: new Animated.Value(0), 
            translateY: new Animated.Value(15)
        }*/
		
    }
        
	/*show(msg, duration) {

        this.setState({
            isShow: true, 
            text: msg, 
			duration: duration || 2000
        });
        
        Animated.timing(this.animateToast.translateY, {
            toValue: 0,
            duration: 200
        }).start();
        
        Animated.timing(this.animateToast.opacity, {
            toValue: 1,
            duration: 200
        }).start(() => {
            this.close();
        });
        
    }
    
    close() {
        
        setTimeout(() => {
            
            Animated.timing(this.animateToast.translateY, {
                toValue: 15,
                duration: 200
            }).start();
            
            Animated.timing(this.animateToast.opacity, {
                toValue: 0,
                duration: 200
            }).start(() => {
                this.setState({
                    isShow: false
                }); 
            });
            
        }, this.state.duration);
        
    }
	
    render() {
		
        return (
			<Animated.View 
				style={[styles.toast, {
					opacity: this.animateToast.opacity, 
					transform: [{
						translateY: this.animateToast.translateY
					}]
				}]} ref={this.props.ref}>
				<Text style={styles.toastText}>{ this.state.text }</Text>
			</Animated.View>
        )
		
    }*/
	
	render() {
		
        return (
			<View style={styles.toast}>
				<Text style={styles.toastText}>{ this.props.message }</Text>
			</View>
        )
		
    }
    
}

const styles = StyleSheet.create({
    toast: {
        backgroundColor: 'rgba(0,0,0,0.85)', 
        borderRadius: 8, 
        justifyContent: 'center', 
        paddingHorizontal: 18, 
        paddingVertical: 16, 
		marginBottom: 45, 
		width: Dimensions.get('window').width - 30
    }, 
    toastText: {
        color: 'white', 
        fontSize: 15
    }
});
