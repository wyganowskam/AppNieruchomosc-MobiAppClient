import React, { Component } from 'react';
import { FlatList,View,  TouchableWithoutFeedback,Keyboard,Text ,Image} from 'react-native';
import styles from "./styles";
import { TextInput,Button,RadioButton } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import {getAllUsers,getUserByEmail} from "../../../services/userService";
import {getUserInfo} from '../../../services/authService';
import {sendMessage,createNewChat,getAllChats} from "../../../services/messengerService";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Checkbox } from 'react-native-paper';
import colors from '../../../config/colors';
import { ScrollView } from 'react-native-gesture-handler';

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
            boardChecked:false,
            buildingAdminChecked:false,
            appAdminChecked:false,
            residentsChecked:false,
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
        const {boardChecked,buildingAdminChecked,appAdminChecked,residentsChecked}=this.state;
        if(
          !boardChecked &&
            !buildingAdminChecked &&
            !appAdminChecked &&
            !residentsChecked
        ){
            
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
            
            const formData = new FormData();
          formData.append('chatName', this.state.groupName);
          formData.append('sendToBoardMembers', this.state.boardChecked);
          formData.append('sendToAdministrators', this.state.buildingAdminChecked);
          formData.append('sendToAppAdmins',this.state.appAdminChecked);
          formData.append('sendToHomeOwners', this.state.residentsChecked);
          formData.append('message', this.state.text);
            createNewChat(formData).then(
                (res)=>{
                    if(res.status === 200){
                      //udało się utworzyć konwersację
                      this.props.navigation.reset({
                        index: 1,
                        routes: [{ name: 'Main' }, {name:'Messages'}],
                      });
                     
                     
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

            <ScrollView style={{ flex: 1 }}
            >
               
               <TextInput
                    label="Nazwa"
                    value={this.state.groupName}
                    style={styles.group}
                    onChangeText={(name) => this.setState({ groupName:name})}/> 
                <View style={{marginLeft:25,alignContent:"flex-start"}}> 
                  <Text style={{marginTop: 5,fontSize:16}}>Odbiorcy</Text>
                  <View style={{flexDirection:"row"}}>
                      <RadioButton
                      status={this.state.boardChecked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({boardChecked: !this.state.boardChecked});
                      }}
                    />
                    <Text style={{marginTop: 5,fontSize:16}}>Zarząd wspólnoty</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                      <RadioButton
                      status={this.state.buildingAdminChecked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({buildingAdminChecked: !this.state.buildingAdminChecked});
                      }}
                    />
                    <Text style={{marginTop: 5,fontSize:16}}>Administartor bydynku</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                      <RadioButton
                      status={this.state.appAdminChecked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({appAdminChecked: !this.state.appAdminChecked});
                      }}
                    />
                    <Text style={{marginTop: 5,fontSize:16}}>Administartor aplikacji</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                      <RadioButton
                      status={this.state.residentsChecked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({residentsChecked: !this.state.residentsChecked});
                      }}
                    />
                    <Text style={{marginTop: 5,fontSize:16}}>Właścicele lokali</Text>
                  </View>
                </View>

               
                <TextInput
                    label="Treść wiadomości"
                    value={this.state.text}
                    style={styles.input}
                    onChangeText={text => {this.setState({ text }) }}
                    multiline
                />
               
              
                {this.state.errorMessage!=='' &&<Text style={{color:colors.error,alignSelf:"center",marginTop:10}}>{this.state.errorMessage}</Text>}
                <Button
                    mode="contained"
                   // disabled={loading}
                    uppercase={true}
                    style={{backgroundColor:colors.button,margin:10,marginTop:50}}
                    onPress={this.handleSendButton}
                >
                Stwórz konwersację
                </Button>
                
            </ScrollView>
        );
    }
}