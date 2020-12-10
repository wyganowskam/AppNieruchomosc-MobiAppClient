import React, { Component } from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import GroupsList from '../../../components/GroupsList/GroupsList';
import styles from './styles';

export default class GroupsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <GroupsList />
                <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() =>{this.props.navigation.navigate('NewMessage')}}  
                />
            </View>
        );
    }
}