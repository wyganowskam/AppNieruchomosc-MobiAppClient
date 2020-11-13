import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { ListItem,Text } from 'react-native-elements';

import colors from '../../config/colors';
import { Button} from 'react-native-elements';
import {getUserInfo} from '../../services/authService';
import {getAllFailures} from '../../services/failureService';

export default class FailureScreen extends Component {
  constructor(props) {
    super(props);
    this.state= {
      failureList:'',
      message:'',
    };

    this.renderRow=this.renderRow.bind(this);
    this.handleAddButton=this.handleAddButton.bind(this);
    this.getFailuresList=this.getFailuresList.bind(this);
    }
    renderRow = ({ item }) => {
   
      return (
        <ListItem onPress={() =>{console.log(item); this.props.navigation.navigate('FailureDetails',{item: item,})}}  bottomDivider>
        
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
            <ListItem.Subtitle>{"Data zgłoszenia: " + item.date}</ListItem.Subtitle>
            <ListItem.Subtitle>{"Status: " + item.status.name}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    };
    handleAddButton = () => {
      this.props.navigation.navigate('FailureAdd');
    };

    getFailuresList = ()=> {
   
      getAllFailures().then(
        res => {
          this.setState({failureList:res.data});
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({message:resMessage});
        }
      ).catch(e => { });
    };

    componentDidMount() {
      this.getFailuresList();
    }
  
    
  
  render() {
    
    return (
      <View style={styles.container}>   
        <ScrollView>
            <FlatList
              data={this.state.failureList}
              keyExtractor={(a) => a.id}
              renderItem={this.renderRow}
            />
          </ScrollView> 
          <View style={styles.bottom}>
          <Button
            title="ZGŁOŚ AWARIĘ"
            containerStyle={{ flex: -1 }}
            titleStyle={{fontSize:13}}
            onPress={this.handleAddButton}
            buttonStyle={{backgroundColor:'grey'}}      
          />
          <Text style={{color:'red'}}>{this.state.message}</Text>
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