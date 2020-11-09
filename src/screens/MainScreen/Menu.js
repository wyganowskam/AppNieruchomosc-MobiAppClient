import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import {  ListItem,  Icon } from 'react-native-elements';
import colors from '../../config/colors';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;



const log = () => console.log('this is an example method');

const menu = [
  {
    title: 'WIADOMOŚCI',
    icon: 'mail',
    page: 'Main',
  },
  {
    title: 'TABLICA OGŁOSZEŃ',
    icon: 'pushpino',
    page: 'Main',
  },
  {
    title: 'GŁOSOWANIA',
    icon: 'carryout',
    page: 'Main',
  },
  {
    title: 'ANKIETY',
    icon: 'linechart',
    page: 'Main',
  },
  {
    title: 'DOKUMENTY',
    icon: 'folderopen',
    page: 'Main',
  },
  {
    title: 'AWARIE',
    icon: 'bells',
    page: 'Failure',
  },
  {
    title: 'USTAWIENIA',
    icon: 'setting',
    page: 'Main',
  },
];


function Menu ({navigation}) {
  
  const renderRow = ({ item }) => {
   
    return (
      <ListItem  onPress={() => 
        navigation.navigate(item.page)} bottomDivider>
        <Icon name={item.icon } type='antdesign'/>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };


  return (
    <View>    
      <FlatList
        data={menu}
        keyExtractor={(a) => a.title}
        renderItem={renderRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 50,
    paddingTop: 0,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: colors.greyOutline,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});

export default Menu;
