import React, { Component } from 'react';
import { View } from 'react-native';
import Messenger from '../../../components/Messenger/Messenger';

export default class ChatScreen extends Component {
    onBackPress = () => {
        this.props.navigation.goBack();
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Messenger onBackPress={this.onBackPress} />
            </View>
        );
    }
}