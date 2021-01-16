import React, { Component } from 'react';
import {FlatList, View,  TouchableWithoutFeedback,Keyboard,ScrollView } from 'react-native';
import styles from "./styles";
import { TextInput,IconButton } from 'react-native-paper';
import { Card, Text } from 'react-native-paper';
import {getUserInfo} from '../../../services/authService';
import {getAllUsers} from "../../../services/userService";
import {sendMessage,createNewChat,getAllChats,getChatContent} from "../../../services/messengerService"
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
        };
        this.getChatInfo=this.getChatInfo.bind(this);
        this.getMyInfo = this.getMyInfo.bind(this);
        this.getOthersInfo = this.getOthersInfo.bind(this);
        this.validate=this.validate.bind(this);
        this.handleSendButton=this.handleSendButton.bind(this);
        this.getMyInfo();
        this.getOthersInfo();
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    };

    dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    componentDidMount() {
      
       
        // this.getChatInfo();
        // this.getMyInfo();


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
                    this.setState({otherUsers:res.data});
                   
                      
                    }
            }
          
            }
          );
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

    getChatInfo(){

        getChatContent(this.state.chatId).then(
            res => {
                if(res!=undefined){
                    if(res.status === 200){
                        this.setState({chatLines:res.data.chatLines})

                    }}
            });
    }

    handleSendButton=()=>{
        const isValid=this.validate();
        if (isValid){
            sendMessage({
                chatId: this.state.chatId,
                message:this.state.text
            }).then((res2)=>{
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
        var username="";
        if (this.state.myUserId===item.userId ) itemStyle=styles.mycard;
        else{
            //trzeba znalezc dane uzytkownika
            const user=this.state.otherUsers.find(u=>u.guid===item.userId);
            if (user)  username=user.name+" "+user.surname+ "";     }
        return (
            <Card 
            style={itemStyle}
            >
            <Card.Title  subtitle={username} title={item.createdOn.substring(0,10)} titleStyle={{fontSize:10}}/>
            <Card.Content >
              <Text>
                  {item.lineText}
              </Text>
            </Card.Content>
         </Card>
        );
        
      };

    render() {
        return (

            <View style={{ flex: 1 }}>
                 <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
                <View style={styles.mess} >
                    {/* <ScrollView 
                     ref={ref => {this.scrollView = ref}}
                     onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                     > */}
                    
                        <FlatList
                        data={this.state.chatLines}
                        ref={ref => {this.scrollView = ref}}
                        keyExtractor={(a) => a.id}
                        onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                        renderItem={this.renderRow}
                        />
                    {/* </ScrollView>  */}
                </View>
                </TouchableWithoutFeedback>
                <Text style={{color:'red',alignSelf:"center"}}>{this.state.errorMessage}</Text>
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