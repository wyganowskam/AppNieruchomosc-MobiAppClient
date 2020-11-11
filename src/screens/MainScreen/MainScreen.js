import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

import Menu from './Menu';
import Profile from './Profile';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
  
  }

  render() {
  
    return (
      <View
        >
          <Profile/>
          <Menu navigation={this.props.navigation}/>
        
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
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 28,
    
  },
  
});
