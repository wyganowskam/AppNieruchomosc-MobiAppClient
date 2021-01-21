import React, { useState } from 'react'
import announcementService from '../../services/announcementService';
import { View, StyleSheet, Dimensions, FlatList, ScrollView ,Image} from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from '../../config/colors';
import { Button,Text,Dialog, Portal,List, Divider } from 'react-native-paper';



const AnnouncementAdd = (props) => {

    const [isFormValid, setIsFormValid] = useState(true);
    const [message, setMessage] = useState("");
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

   

    const validate = () => {
      if(!text || !title){
          setMessage("Wypełnij wszystkie wymagane pola");
          setIsFormValid(false);
          return false;
      }
      else if(text.length < 10){
          setMessage("Treść ogłoszenia musi mieć co najmniej 10 znakow");
          setIsFormValid(false);
          return false;
      }
      else if(title.length < 10){
        setMessage("Tytuł ogłoszenia musi mieć co najmniej 10 znakow");
        setIsFormValid(false);
        return false;
    }
    else if(text.length > 4000){
        setMessage("Treść ogłoszenia może mieć maksymalnie 4000 znaków");
        setIsFormValid(false);
        return false;
    }
    else if(title.length > 100){
      setMessage("Tytuł ogłoszenia może mieć maksymalnie 100 znakow");
      setIsFormValid(false);
      return false;
  }
      else{
          setIsFormValid(true);
          return true;
      }
  
    }
  
    const handleAdd = (e) => {
      e.preventDefault();
      setMessage("");
      let isValid = validate();
  
      if(isValid === true){
        setLoading(true);
        announcementService.createAnnouncement({
            title: title,
            text: text,
        }).then(
          () => {
            this.props.navigation.reset({
              index: 1,
              routes: [{ name: 'Main' }, {name:'Announcements'}],
            });
            // props.navigation.push('Announcements');
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setIsFormValid(false);
            setMessage(resMessage);
  
          }
        );
      }
      setLoading(false);
    };
    

    return (
     <ScrollView style={{backgroundColor:colors.white}}>
   
         <TextInput
            label="Tytuł ogłoszenia"
            value={title}
            style={{backgroundColor:colors.lightWhite,marginLeft:10,marginRight:10}}
            onChangeText={(t) => setTitle(t)}/> 
            <TextInput
              label="Treść ogłoszenia"
              multiline
              style={{height:400,backgroundColor:colors.lightWhite,marginLeft:10,marginRight:10}}
              value={text}
              onChangeText={(t) => setText(t)}
            /> 

        {!isFormValid && <ErrorAlert message={message}/>}
        <Button
            loading={loading}
            compact={true}
              uppercase={true}
            labelStyle={{fontSize:13,color:colors.white}}
            onPress={handleAdd}
            disabled={loading}
            style={{backgroundColor:colors.button,margin:10}}>
              opublikuj
            </Button>
        </ScrollView>
    )
}

export default AnnouncementAdd;