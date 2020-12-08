import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableRipple } from 'react-native-paper';

import StatusItem from './StatusItem';
import styles from './styles';

import { users } from './fake_data';

export default class StatusList extends Component {
    renderItem = ({ item }) => {
        return <StatusItem item={item} />;
    };
  
    onWatchAll = () => {
        console.log('Pressed');
    };

    render() {
        let recent = users;
        return (
            <View>
                <FlatList
                    horizontal
                    data={recent}
                    renderItem={this.renderItem}
                    showsHorizontalScrollIndicator={false}
                    
                />
            </View>
        );
    }
};

