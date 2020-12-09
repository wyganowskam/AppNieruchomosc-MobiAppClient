import React, { Component } from 'react';
import { FlatList } from 'react-native';
import GroupsItem from './GroupsItem';
import styles from './styles';

const data = [
    {
        id:1,
        name: 'Grupa- świąteczny prezent dla Zarządu',
        last_active: '15 dni temu',
        members: 'Anna, Jan, Ala, Paweł + 32'
    },
    {
        id:2,
        name: 'Pierwsze piętro',
        last_active: '30 dni temu',
        members: 'KOWALSCY, NOWAKOWIE'
    },
    {
        id:3,
        name: 'Zarząd i administrator',
        last_active: '30 dni temu',
        members: 'Ania, Jola, Pan Zbyszek'
    },
    {
        id:4,
        name: 'Najlepsza wspólnota',
        last_active: '10 dni temu',
        members: 'Karol, Ala, Wiktor + 12'
    },
    {
        id:5,
        name: 'Sylwester w świetlicy',
        last_active: '5 dni temu',
        members: 'Tomek, Sabina, Krzysiek, +12'
    },
    {
        id:6,
        name: 'Grupa awaria kanalziacji',
        last_active: '24 dni temu',
        members: 'Wiki, Ela, Ola'
    },
    
];

export default class GroupsList extends Component {
    renderItem = ({ item }) => {
        return <GroupsItem item={item} />;
    };

    render() {
        return (
            <FlatList
                data={data}
                contentContainerStyle={styles.list}
                numColumns={2}
                renderItem={this.renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(a) => a.id}
            />
        );
    }
}