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
              
                {/* <View>
                  <Searchbar
                    placeholder="Wyszukaj"
                    onChangeText={this.onChangeSearch}
                    value={this.state.searchQuery}
                    onIconPress={this.onPressSearch}
                    style={styles.search}
                    
                  />
                  <Text style={{color:'red',alignSelf:"center"}}>{this.state.errorMessage}</Text>
                </View> */}
                 <View style={{height:50,backgroundColor:colors.white,flexDirection:"row",padding:10,flex:1}}>
                  <Button
                      mode="text"
                      labelStyle={styles.TransparentButtonText}
                      compact={true}
                      uppercase={false}
                     // onPress={previousPage}
                      style={{alignSelf:"center"}}
                    > <Image style={{width:20,height:20,alignSelf:"center"}} source={require('../../../assets/icons/left-arrow-bold.png')} />
                        
                      </Button>
                  <Text style={{fontSize:20,alignSelf:"center",marginLeft:6,paddingBottom:2}}>
                  {/* {page}  */}
                  08788
                  </Text>
                    <Button
                      mode="text"
                      labelStyle={styles.TransparentButtonText}
                      compact={true}
                      uppercase={false}
                     // onPress={nextPage}
                      style={{alignSelf:"center"}}
                    > <Image style={{width:20,height:20,alignSelf:"center"}} source={require('../../../assets/icons/right-arrow-bold.png')} />
                        
                      </Button>
                      <Searchbar
                    placeholder="Wyszukaj"
                    onChangeText={this.onChangeSearch}
                    value={this.state.searchQuery}
                    onIconPress={this.onPressSearch}
                    style={styles.search}
                    icon={()=><Image style={{width:28,height:28,alignSelf:"center",margin:2}} source={require('../../../assets/icons/loupe.png')} />} 
                    
                  />
                    <FAB
                  style={styles.fab}
                  small
                  icon={props=><Image style={{width:20,height:20,alignSelf:"center",marginTop:2}} source={require('../../../assets/icons/plus.png')} />}
                  onPress={() =>{this.props.navigation.navigate('NewMessage')}}  
                  />
                  </View>
                
               
                     <Divider/>
                    <FlatList
                    data={this.state.chatsList}
                    keyExtractor={(a) => a.chatId}
                    renderItem={this.renderRow}
                    />
               
{/* 
                <FAB
                style={styles.fab}
                small
                icon={props=><Image style={{width:20,height:20,alignSelf:"center",marginTop:2}} source={require('../../../assets/icons/plus.png')} />}
                onPress={() =>{this.props.navigation.navigate('NewMessage')}}  
                /> */}
            </View>
        );
    };
}

MessagesScreen.propTypes = {
    navigation: PropTypes.object
};