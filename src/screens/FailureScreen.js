import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class FailureScreen extends Component {
  constructor(props) {
    super(props);
    }

  
  render() {
    
    return (
      <View
        style={styles.container}       
      >
        <Text>Awarie tu</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 50,
    paddingTop: 0,
    backgroundColor: 'white',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
 
});
