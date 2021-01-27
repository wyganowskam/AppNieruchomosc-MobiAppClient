import React, { Component } from 'react';
import {FlatList, View,Image,  TouchableWithoutFeedback,Keyboard,ScrollView,KeyboardAvoidingView } from 'react-native';
import styles from "./styles";
import { TextInput,Button,RadioButton } from 'react-native-paper';
import { Card, Text } from 'react-native-paper';
import {getUserInfo} from '../../../services/authService';
import {getAllUsers} from "../../../services/userService";
import {sendMessage,createNewChat,getAllChats,getChatContent} from "../../../services/messengerService"
import colors from "../../../config/colors"
import ChatHubService from '../../../services/hubService';
import deviceStorage from "../../../services/deviceStorage"

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            chatId: this.props.route.params.item.chatId,
            chatLines:[],
            errorMessage:'',
            myUserId:'',
            otherUsers:[],
            connection:null,
        };
        this.getChatInfo=this.getChatInfo.bind(this);
       
        this.validate=this.validate.bind(this);
        this.handleSendButton=this.handleSendButton.bind(this);
      
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    };

    dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    componentDidMount() {
      
       
         this.getChatInfo();
         
        //  deviceStorage.getItem('id_token')
        // .then((userTokenVal)=>{ 
        //     const newConnection = ChatHubService.getConnection(userTokenVal);
        //     console.log(newConnection);
        //     this.setState({connection:newConnection})
        //     this.connect()})
        
      }

    //   connect() {
    //     const {connection}=this.state;
    //     connection.start()
    //     .then(result => {
    //         console.log(connection);

    //         connection.on(ChatHubService.MethodName, res => {
    //           if(res.chatId === latestChatId.current && res.chatLineDto.id !== latestChatLine.current.id) {
    //                 // const updatedChat = [...latestChat.current];
    //                 // updatedChat.push(res.chatLineDto);
    //                 console.log('receiveMessage!');
    //                 // setCurrentChatContent(updatedChat);
    //                 // setCurrentChatLine(res.chatLineDto);
    //                 // document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight;
    //             }
    //         });
    //     })
    //     .catch(e =>{ console.log('Connection failed: ', e); });
    //   }
   
    getChatInfo(){

        // if (props.id>'-1'){
        //     ChatService.getChatByChatId(props.id).then((res) => {
        //       setCurrentChatContent(res.data.chatLines);
        //       document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight;
        //     },(error) => {
                  
        //     }
        //     ).catch(e => { });
        //   }
        getChatContent(this.state.chatId).then(
            res => {
                if(res!=undefined){
                    if(res.status === 200){
                        this.setState({chatLines:res.data.chatLines.reverse()})

                    }}
            });
    }

    handleSendButton=()=>{
        const isValid=this.validate();
        const formData = new FormData();
        formData.append('chatId', this.state.chatId);
        formData.append('message', this.state.text);
        if (isValid){
            sendMessage(formData).then((res2)=>{
                 if (res2.status===200){
                    this.getChatInfo();
                    this.setState({text:''})
                 }
                 else {
                     this.setState({errorMessage: res.message})
                 }
            });
        }

        
    }

    validate= () => {
        
        if (this.state.text==''){
            this.setState({errorMessage:"Nie można wysłać pustej wiadomości"});
            return false;
        }
        else return true;

    };

    renderRow = ({ item }) => {
        var itemStyle=styles.card;
        var fontStyle=styles.text;
        if (item.isOwnMessage === true ) {itemStyle=styles.mycard; fontStyle=styles.mytext}
        return (
            <>
           
            <Card 
            style={itemStyle}
            >
            <Card.Content >
              <Text style={{fontSize:16}}>
                  {item.lineText}
              </Text>
            </Card.Content>
         </Card>
         <Text style={fontStyle}>{item.createdOn.substring(0,10) + " " + item.createdOn.substring(11,16) +"\n"}<Text >{item.userName + " " + item.userSurname}</Text></Text>
         </>
        );
        
      };

    render() {
        return (
<View style={{flex:1,backgroundColor:colors.beige}} contentContainerStyle={{flexGrow:1}}>
         
             
                <View style={{flex:1}} >
                   
                        <FlatList
                        data={this.state.chatLines}
                        ref={ref => {this.scrollView = ref}}
                        keyExtractor={(a) => a.id}
                        inverted={true}
                       // onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                        renderItem={this.renderRow}
                        />
                  
                </View>
               
                <Text style={{color:'red',alignSelf:"center"}}>{this.state.errorMessage}</Text>
              
                <KeyboardAvoidingView
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                 >
             

                <TextInput
                    label="Nowa wiadomość"
                    value={this.state.text}
                    style={styles.input}
                    // onFocus={() => this.scrollView.scrollToEnd({animated: true})}
                    onChangeText={text => {this.setState({ text }); }}
                    multiline
                />
                  <Button
                    mode="text"
                    compact={true}
                    uppercase={false}
                    onPress={this.handleSendButton}
                    style={{alignSelf:"center"}}
                > <Image style={{width:20,height:20,alignSelf:"center"}} source={require('../../../assets/icons/send.png')} />
                    
                    </Button>
                   
             
                </KeyboardAvoidingView>
          
            </View>
        );
    }
}