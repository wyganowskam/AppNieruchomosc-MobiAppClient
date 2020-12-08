import React, { Component } from 'react';
import { View, FlatList, ScrollView  } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { ListItem,Text } from 'react-native-elements';
import StatusList from '../../../components/StatusList/StatusList';
import {ChatsList} from "../fake_data";
import StatusItem from "../../../components/StatusList/StatusItem";
import styles from './styles';


export default class MessagesScreen extends Component {
    constructor(props) {
        super(props);
        this.state= {
         
          message:'',
        };
        this.renderRow=this.renderRow.bind(this);
       
    };
    renderRow = ({ item }) => {
   
        return (
          <ListItem //onPress={() =>{this.props.navigation.navigate('ChatScreen',{item: item,})}}  
          bottomDivider>
            <StatusItem item={item} />
            <ListItem.Content>
              <ListItem.Title>{item.username}</ListItem.Title>
              <ListItem.Subtitle>{"Data: " + item.date}</ListItem.Subtitle>
              <ListItem.Subtitle>{"Wiadomość: " + item.lastMessage.substring(1,50) + '...'}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        );
      };


    render() {
        return (
            <View style={styles.container}>
                <StatusList //lista użytkowników
                /> 
                 <ScrollView>
                    <FlatList
                    data={ChatsList}
                    keyExtractor={(a) => a.id}
                    renderItem={this.renderRow}
                    />
                </ScrollView> 
            </View>
        );
    };
}

MessagesScreen.propTypes = {
    navigation: PropTypes.object
};