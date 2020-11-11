import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import {failureList} from './failureData';
import colors from '../../config/colors';
import { Button} from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class FailureScreen extends Component {
  constructor(props) {
    super(props);

    this.renderRow=this.renderRow.bind(this);
    this.handleAddButton=this.handleAddButton.bind(this);
    }
    renderRow = ({ item }) => {
   
      return (
        <ListItem onPress={() => this.props.navigation.navigate('FailureDetails',{itemId: item.id,})}  bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
            <ListItem.Subtitle>{"Data zgłoszenia: " + item.date}</ListItem.Subtitle>
            <ListItem.Subtitle>{"Status: " + item.status}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    };
    handleAddButton = () => {
      this.props.navigation.navigate('FailureAdd');
    };

  
    
  
  render() {
    
    return (
      <View style={styles.container}>   
        <ScrollView>
            <FlatList
              data={failureList}
              keyExtractor={(a) => a.id}
              renderItem={this.renderRow}
            />
          </ScrollView> 
          <View style={styles.bottom}>
          <Button
            //loading={isLoading}
            title="ZGŁOŚ AWARIĘ"
            containerStyle={{ flex: -1 }}
            
            titleStyle={{fontSize:13}}
            onPress={this.handleAddButton}
           // disabled={isLoading}
            buttonStyle={{backgroundColor:'grey'}}
            
          />
          </View>
          
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
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
  
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
   
  },
  button: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 45,
    alignSelf:'center',
    backgroundColor:'gray'
  },
});