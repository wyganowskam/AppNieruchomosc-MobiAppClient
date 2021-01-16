import React from 'react'
import { View, StyleSheet,  ScrollView,Image  } from 'react-native';
import {Text, } from 'react-native-paper';
import colors from '../../config/colors';
import { Card, Title, Paragraph,Divider } from 'react-native-paper';


const AnnouncementDetails = (props) => {

   
    const ann = props.announcement;

    return (
      
            <Card style={{margin:10,marginBottom:50,backgroundColor:colors.delicateButton}}>
              <Card.Title title={ann.title} subtitle={"Utworzono: " + ann.created} titleStyle={{fontSize:20, color:colors.button}} subtitleStyle={{fontSize:14}} />
              <Card.Content>
              <Divider style={{margin:10}}/>
              <Text style={{fontSize:16}}>{ann.longText+"\n"}</Text>
              
      
              </Card.Content> 
            </Card>
         
    )
}


export default AnnouncementDetails;