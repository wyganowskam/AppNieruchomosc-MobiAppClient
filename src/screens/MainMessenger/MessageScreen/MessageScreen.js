import React, { Component } from 'react';
import { View, FlatList, ScrollView,Image  } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { List,Text,Divider,Avatar,Card } from 'react-native-paper';
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
          chats:[],
          message:'',
          errorMessage:'',
          searchQuery:'',
          loading:true
        };
        this.renderRow=this.renderRow.bind(this);
        this.onChangeSearch=this.onChangeSearch.bind(this);
        this.getChatsList=this.getChatsList.bind(this);
        this.searchFilterFunction=this.searchFilterFunction.bind(this);
        
       
    };

    onChangeSearch = query => this.setState({searchQuery:query});
   
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
             this.setState({chats :res.data,loading:false});
            
              
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
          style={{marginLeft:7,marginRight:7,borderRadius:20,backgroundColor:colors.white }}
          titleStyle={{color:colors.textViolet, fontSize:16,}}  
          right={()=><Image style={{width:10,height:10,alignSelf:"center"}} source={require('../../../assets/icons/right-arrow.png')} />} 
         // left={()=><Avatar.Text size={30} style={{backgroundColor:colors.button,alignSelf:"center"}} label={item.username.charAt(0)}/>}
          left={()=><Image style={{width:28,height:28,alignSelf:"center",margin:2}} source={require('../../../assets/icons/chatting.png')} />} 
          /><Divider style={{marginLeft:27,marginRight:27}}/>
          </>
        );
      };
   
    render() {
     
        return (
            <View style={styles.container}>
              
             
                 <View style={{height:70,backgroundColor:colors.white,flexDirection:"row",padding:10, marginBottom:3}}>
                 
                      <Searchbar
                    placeholder="Wyszukaj"
                    onChangeText={this.onChangeSearch}
                    value={this.state.searchQuery}
                  
                   clearIcon={()=><></>}
                    style={styles.search}
                    icon={()=><Image style={{width:20,height:20,alignSelf:"center",margin:2}} source={require('../../../assets/icons/loupe.png')} />} 
                   
                  />
                    <FAB
                  style={styles.fab}
                  small
                  icon={props=><Image style={{width:20,height:20,alignSelf:"center",marginTop:2}} source={require('../../../assets/icons/plus.png')} />}
                  onPress={() =>{this.props.navigation.navigate('NewMessage')}}  
                  />
                  </View>
                
               
                     <Divider/>
                     
                     {this.state.errorMessage!=='' &&  <Text style={{color:'red',alignSelf:"center"}}>{this.state.errorMessage}</Text>}
                    {this.state.chats.length<1 && !this.state.loading &&
                     <Card style={{margin:10, marginTop:60, height:50, backgroundColor:colors.happyGreen,alignSelf:"center"}}>
                     <Card.Content>
                     <Text >Brak wiadomości</Text>
                     </Card.Content>
                   </Card>}
                    {
                      this.state.chats.filter(
                        (chat) => (
                         
                          this.state.searchQuery.length<1 
                    || chat.chatName.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                    || chat.lastMessage.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                    || chat.modifiedOn.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                        )
          
                      ).map((item)=>
                       
                        <List.Item key={item.chatId} onPress={() =>{this.props.navigation.navigate('Chat',{item: item,})}} 
                     
                        title={item.chatName}
                        description={ item.modifiedOn.substring(0,10)+ "\n" + item.lastMessage.substring(0,30) + '...'}
                        style={{marginLeft:7,marginRight:7,borderRadius:20,backgroundColor:colors.white,marginBottom:2 }}
                        titleStyle={{color:colors.textViolet, fontSize:16,}}  
                        right={()=><Image style={{width:10,height:10,alignSelf:"center"}} source={require('../../../assets/icons/right-arrow.png')} />} 
                       // left={()=><Avatar.Text size={30} style={{backgroundColor:colors.button,alignSelf:"center"}} label={item.username.charAt(0)}/>}
                        left={()=><Image style={{width:28,height:28,alignSelf:"center",margin:2}} source={require('../../../assets/icons/chatting.png')} />} 
                        />

                      )
                    }
                    
                    {/* <FlatList
                    data={this.state.chatsList}
                    keyExtractor={(a) => a.chatId}
                    renderItem={this.renderRow}
                    /> */}
            </View>
        );
    };
}

MessagesScreen.propTypes = {
    navigation: PropTypes.object
};