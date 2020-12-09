import React, { Component } from 'react';
import { View, FlatList, ScrollView  } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { ListItem,Text } from 'react-native-elements';
import StatusList from '../../../components/StatusList/StatusList';
import {ChatsList} from "../fake_data";
import StatusItem from "../../../components/StatusList/StatusItem";
import styles from './styles';
import { FAB } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';

export default class MessagesScreen extends Component {
    constructor(props) {
        super(props);
        this.state= {
          
          message:'',
          searchQuery:'',
        };
        this.renderRow=this.renderRow.bind(this);
        this.onChangeSearch=this.onChangeSearch.bind(this);
        this.onPressSearch=this.onPressSearch.bind(this);
       
    };

    onChangeSearch = query => this.setState({searchQuery:query});
    onPressSearch = query => {console.log(this.state.searchQuery);};

    renderRow = ({ item }) => {
   
        return (
          <ListItem //onPress={() =>{this.props.navigation.navigate('ChatScreen',{item: item,})}}  
          bottomDivider>
            <StatusItem item={item} />
            <ListItem.Content>
              <ListItem.Title>{item.username}</ListItem.Title>
              <ListItem.Subtitle>{"Data: " + item.date}</ListItem.Subtitle>
              <ListItem.Subtitle>{"Wiadomość: " + item.lastMessage.substring(1,30) + '...'}</ListItem.Subtitle>
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
                <View>
                  <Searchbar
                    placeholder="Wyszukaj"
                    onChangeText={this.onChangeSearch}
                    value={this.state.searchQuery}
                    onIconPress={this.onPressSearch}
                  />
                </View>
                
                 <ScrollView>
                    <FlatList
                    data={ChatsList}
                    keyExtractor={(a) => a.id}
                    renderItem={this.renderRow}
                    />
                </ScrollView> 
                
                <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => console.log('Pressed')}
                />
            </View>
        );
    };
}

MessagesScreen.propTypes = {
    navigation: PropTypes.object
};