import React, { Component } from 'react';
import { View, FlatList, ScrollView,Image  } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { List,Text,Divider,Avatar } from 'react-native-paper';
import styles from './styles';
import { FAB } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import {getAllChats} from "../../../services/messengerService"
import {getAllUsers,getUserByEmail} from "../../../services/userService";
import {ChatsList} from "../fake_data";
import colors from "../../../config/colors"

export default class MessagesScreen extends Component {
    constructor(props) {
        super(props);
        this.state= {
          chatsList:ChatsList,
          allChatsList:ChatsList,
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
      //this.getChatsList();
    
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
          <>
          <List.Item  onPress={() =>{this.props.navigation.navigate('Chat',{item: item,})}} 
         // title={item.chatName}
          title={item.username}
          description={ item.modfifiedOn+ "\n" + item.lastMessage.substring(1,30) + '...'}
          
          titleStyle={{color:colors.textViolet, fontSize:16,}}  
          right={()=><Image style={{width:10,height:10,alignSelf:"center"}} source={require('../../../assets/icons/right-arrow.png')} />} 
          left={()=><Avatar.Text size={30} style={{backgroundColor:colors.button,alignSelf:"center"}} label={item.username.charAt(0)}/>}
          /><Divider style={{ backgroundColor:colors.violet}} />
          </>
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
                
               
                     <Divider style={{ backgroundColor:colors.violet}} />
                    <FlatList
                    data={this.state.chatsList}
                    keyExtractor={(a) => a.chatId}
                    renderItem={this.renderRow}
                    />
               

                <FAB
                style={styles.fab}
                small
                icon={props=><Image style={{width:20,height:20,alignSelf:"center",marginTop:2}} source={require('../../../assets/icons/plus.png')} />}
                onPress={() =>{this.props.navigation.navigate('NewMessage')}}  
                />
            </View>
        );
    };
}

MessagesScreen.propTypes = {
    navigation: PropTypes.object
};