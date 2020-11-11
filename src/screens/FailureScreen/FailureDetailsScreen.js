import React, { Component } from 'react';
import { View, StyleSheet, Dimensions,  } from 'react-native';
import {Text} from 'react-native-elements';
import {failureList} from './failureData';
import colors from '../../config/colors';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


export default class FailureDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    }
    
  
    render() {
       const id=this.props.route.params.itemId;
       const failure=failureList.find(data=>data.id==id)
        return (
          <View >
          
            <Text h3>{failure.title}</Text>
            <Text>{"Data: " + failure.date}</Text>
            <Text>{"Status: " + failure.status}</Text>
            <Text>{"Opis: \n" + failure.description}</Text>
          </View>
        );
      }
}






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