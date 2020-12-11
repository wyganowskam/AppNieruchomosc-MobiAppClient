import React, { Component } from 'react';
import { View, FlatList, ScrollView  } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { ListItem,Text,Icon } from 'react-native-elements';
import StatusList from '../../../components/StatusList/StatusList';
import {ChatsList} from "../fake_data";
import StatusItem from "../../../components/StatusList/StatusItem";
import styles from './styles';
import { FAB } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import {getAllChats} from "../../../services/messengerService"
import {getAllUsers,getUserByEmail} from "../../../services/userService"

export default class MessagesScreen extends Component {
    constructor(props) {
        super(props);
        this.state= {
          chatsList:[],
          allChatsList:[],
          message:'',
          errorMessage:'',
          searchQuery:'',
        };
        this.renderRow=this.renderRow.bind(this);
        this.onChangeSearch=this.onChangeSearch.bind(this);
        this.onPressSearch=this.onPressSearch.bind(this);
        this.getChatsList=this.getChatsList.bind(this);
        this.searchFilterFunction=this.searchFilterFunction.bind(this);
        
       
    };

    onChangeSearch = query => this.setState({searchQuery:query});
    onPressSearch= ()=> {
      console.log(this.state.searchQuery);
      this.searchFilterFunction(this.state.searchQuery);
    };
    componentDidMount() {
      this.getChatsList();
    
    }
    searchFilterFunction = text => {    
      const newData = this.state.allChatsList.filter(item => {      
        const itemData = `${item.chatName.toUpperCase()}   
        ${item.modfifiedOn.toUpperCase()}`;
        
         const textData = text.toUpperCase();
          
         return itemData.indexOf(textData) > -1;    
      });
      
      this.setState({ chatsList: newData });  
    };
   

    getChatsList = ()=> {
     
      getAllChats().then(
        (res) => {
          if(res!=undefined){
            if(res.status === 200){
              //udało się zdobyć informacje
             this.setState({allChatsList:res.data,chatsList :res.data});
              
            }
          }
          
        }
      );
    };

    renderRow = ({ item }) => {
   
        return (
          <ListItem  onPress={() =>{this.props.navigation.navigate('Chat',{item: item,})}}  
          bottomDivider
          style={{margin:4}}>
            {/* <StatusItem item={item} /> */}
            <Icon name='wechat' type='antdesign' color='lightblue'/>
            <ListItem.Content>
              <ListItem.Title>{item.chatName}</ListItem.Title>
              <ListItem.Subtitle>{"Data: " + item.modfifiedOn}</ListItem.Subtitle>
              {item.lastMessage && <ListItem.Subtitle>{"Wiadomość: " + item.lastMessage.substring(1,30) + '...'}</ListItem.Subtitle>}
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        );
      };
   
    render() {
     
        return (
            <View style={styles.container}>
                {/* <StatusList //lista użytkowników
                />  */}
                <View>
                  <Searchbar
                    placeholder="Wyszukaj"
                    onChangeText={this.onChangeSearch}
                    value={this.state.searchQuery}
                    onIconPress={this.onPressSearch}
                    style={styles.search}
                    
                  />
                  <Text style={{color:'red',alignSelf:"center"}}>{this.state.errorMessage}</Text>
                </View>
                
                 <ScrollView>
                    <FlatList
                    data={this.state.chatsList}
                    keyExtractor={(a) => a.chatId}
                    renderItem={this.renderRow}
                    />
                </ScrollView> 

                <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() =>{this.props.navigation.navigate('NewMessage')}}  
                />
            </View>
        );
    };
}

MessagesScreen.propTypes = {
    navigation: PropTypes.object
};