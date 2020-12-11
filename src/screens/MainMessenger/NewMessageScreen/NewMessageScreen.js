import React, { Component } from 'react';
import { FlatList,View,  TouchableWithoutFeedback,Keyboard,Text } from 'react-native';
import styles from "./styles";
import { TextInput,IconButton } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import {getAllUsers,getUserByEmail} from "../../../services/userService";
import {getUserInfo} from '../../../services/authService';
import {sendMessage,createNewChat,getAllChats} from "../../../services/messengerService";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
//import {getAllUsers} from "../../../services/userService";
export default class NewMessageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            searchQuery:'',
            errorMessage:'',
            groupName:'',
            usersList: [], 
            allUsersList:[],
            myUserId:'',
        };
        this.onChangeSearch=this.onChangeSearch.bind(this);
        this.onChangeUser=this.onChangeUser.bind(this);
        this.onPressSearch=this.onPressSearch.bind(this);
        this.validate=this.validate.bind(this);
        this.getMyInfo = this.getMyInfo.bind(this);
        this.handleSendButton=this.handleSendButton.bind(this);
        this.getOthersInfo = this.getOthersInfo.bind(this);
        this.getMyInfo();
        this.getOthersInfo();
        
    }
    onChangeSearch = query =>{
       
        this.setState({searchQuery:query,errorMessage:""});
    }

    getMyInfo(){
        getUserInfo().then(
            (res) => {
            
              if(res.status === 200){
              //udało się zdobyć informacje o użytkowniku
               this.setState({myUserId:res.data.guid});
             
                
              }
            }
          );
    }

    getOthersInfo(){
        getAllUsers().then(
            (res) => {
            if (res!=undefined){
                if(res.status === 200){
                    //udało się zdobyć informacje o użytkownikach
                    this.setState({allUsersList:res.data.filter(el=>el.guid!=this.state.myUserId)});
                   
                      
                    }
            }
          
            }
          );
    }
    onPressSearch = () => {
        
        //console.log(this.state.searchQuery);
        getUserByEmail(this.state.searchQuery).then(
            res => {
            if(res!=undefined){
              if(res.status === 200){
                //użytkownik jest w bazie, czyli można wysłać zaproszenie
               // console.log("dane użytkownika:"+res.data);
                const newUser= {
                    name:this.state.searchQuery,
                    userId:res.data,
                }
                const oldList=this.state.usersList;
                this.setState({usersList:[...oldList,newUser],searchQuery:''});
              }
              else{
                
                setMessage("Błąd serwera.");
              }}
            },
            (error) => {
             
            }
          );
        //   const newUser= {
        //     name:this.state.searchQuery,
        //     userId:this.state.usersList.length+1,
        // }
        //   const oldList=this.state.usersList;
        //   this.setState({usersList:[...oldList,newUser]});
    
          //wyczyszczenie zapytania
         
    };


    validate= () => {
        
        if(this.state.usersList.length<1 ){
            
            this.setState({errorMessage:"Wybierz odbiorcę"});
            return false;
        }
        else if (this.state.text==''){
            this.setState({errorMessage:"Nie można wysłać pustej wiadomości"});
            return false;
        }
        else if (this.state.groupName==''){
            this.setState({errorMessage:"Wątek musi mieć nazwę"});
            return false;
        }
        else return true;

    };
    
    onBackPress = () => {
        this.props.navigation.goBack();
    };

    dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    renderRow = ({ item }) => {
   
        return (
            <Chip 
            key={item.name}
            mode="flat"
            style={styles.chip}
             onClose={() => {
                 console.log('Closed');
                 const oldList=this.state.usersList;
                 const newList=oldList.filter(el=>el.name!=item.name);
                 this.setState({usersList:newList});
            }}
             onPress={() => {console.log('Pressed')}}>
                 {item.name}</Chip>
        );
      };

      handleSendButton = () => {
        this.setState({errorMessage:""});
          const isValid=this.validate();
         
          if(isValid === true){
            //tworze nowy czat
            const recivers= this.state.usersList.map(x=>x.userId);
          
            createNewChat({
                chatName: this.state.groupName,
                receiverIds: recivers,
            }).then(
                (res)=>{
                    if(res.status === 200){
                      //udało się utworzyć konwersację
                     
                      getAllChats().then(
                        (res) => {
                          
                          if(res.status === 200){
                            //udało się zdobyć informacje
                            const thisChat=res.data.find(e=>e.chatName===this.state.groupName)
                           if (thisChat.length>1) thisChat=thisChat[0];
                           //wysyłamy wiadomość
                           sendMessage({
                               chatId: thisChat.chatId,
                               message:this.state.text
                           }).then((res2)=>{
                                if (res2.status===200){
                                    console.log("papa");
                                    this.props.navigation.reset({
                                        index: 1,
                                        routes: [{ name: 'Main' }, {name:'Messages'}],
                                      });
                                  

                                }
                                else {
                                    this.setState({errorMessage: res.message})
                                }
                           })
                         
                          }
                        }
                      );

                     
                      }
                },
            (error) => {
             
              const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              console.log(resMessage);
            
            });



          }
    };
    onChangeUser = e => {
        const val = e.target.value;
      //  this.setState({apartmentId:val});
      const newUser= {
        name:val.name+" "+val.surname,
        userId:val.guid,
    }
    
    const oldList=this.state.usersList;
    const isInTheList=oldList.find(el=>el.userId===val.guid);
    if (isInTheList===undefined)this.setState({usersList:[...oldList,newUser],searchQuery:''});
   
      };
      

    render() {
        return (

            <View style={{ flex: 1 }}
            >
                 
               <TextInput
                    label="Nazwa wątku"
                    value={this.state.groupName}
                    style={styles.group}
                    onChangeText={(name) => this.setState({ groupName:name})}/> 
                 {/* <Searchbar
                    placeholder="Wyślij do:"
                    onChangeText={this.onChangeSearch}
                    value={this.state.searchQuery}
                    onIconPress={this.onPressSearch}
                  />   */}
                    <TextField
                         select
                        value=""
                        label="Wyślij do:"
                        onChange={this.onChangeUser}
                        style={{margin:20}}
                        >
                        {this.state.allUsersList.map((user) => (
                            <MenuItem key={user.guid} value={user}>
                            {user.name + " " + user.surname}
                            </MenuItem>
                        ))}
                    </TextField>

                 <Text style={{color:'red',alignSelf:"center"}}>{this.state.errorMessage}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                <FlatList
                    data={this.state.usersList}
                    keyExtractor={(a) => a.userId}
                    renderItem={this.renderRow}
                                       
                />
                </View>
               
                 <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
                <View style={{ flex: 1 }} >
                           
                </View>
                </TouchableWithoutFeedback>
                <View style={styles.container} >
                <TextInput
                    label="Nowa wiadomość"
                    value={this.state.text}
                    style={styles.input}
                    onChangeText={text => {this.setState({ text }) }}
                    multiline
                />
                <IconButton
                    icon="send"
                    size={20}
                    onPress={this.handleSendButton}
                />
                </View>
                
            </View>
        );
    }
}