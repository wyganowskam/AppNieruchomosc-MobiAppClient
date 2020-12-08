import React, { Component } from 'react';
import {
    View,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import InputModule from './InputModule';


export default class Messenger extends Component {
    onBackPress = () => {
        this.props.onBackPress();
    };

    dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
              
                <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
                <InputModule />
               
            </View>
        );
    }
}