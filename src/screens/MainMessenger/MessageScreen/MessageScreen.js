import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

import StatusList from '../../../components/StatusList/StatusList';

import styles from './styles';

export default class MessagesScreen extends Component {
   
    render() {
        return (
            <View style={styles.container}>
                <StatusList //lista użytkowników
                /> 
            </View>
        );
    }
}

MessagesScreen.propTypes = {
    navigation: PropTypes.object
};