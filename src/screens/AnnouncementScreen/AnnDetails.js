import React from 'react'
import { View, StyleSheet,  ScrollView,Image  } from 'react-native';
import {Text, } from 'react-native-paper';
import colors from '../../config/colors';
import { Card, Title, Paragraph,Divider,Button } from 'react-native-paper';
import announcementService from '../../services/announcementService';
const AnnouncementDetails = (props) => {

  const onFileDownload = (id, name) => {
    // setLoading(true);
    // setLoadingId(id);
    announcementService.downloadAttachment(id, name).then(res => {
      //setLoading(false);
      let url = window.URL.createObjectURL(res.data);
      var fileLink = document.createElement('a');
      fileLink.href = url
      fileLink.download = name;
      fileLink.click();

    }, (error) => {});
  }
    const ann = props.announcement;
    console.log(ann);
    return (
      
            <Card style={{margin:10,marginBottom:50,backgroundColor:colors.delicateButton}}>
              <Card.Title title={ann.title} subtitle={"Utworzono: " + ann.created} titleStyle={{fontSize:20, color:colors.button}} subtitleStyle={{fontSize:14}} />
              <Card.Content>
              <Divider style={{margin:10}}/>
              <Text style={{fontSize:16}}>{ann.longText+"\n"}</Text>
              {ann.attachments?.length > 0 &&
             <Text style={{fontSize:15,fontWeight:"bold"}} >
            Załączniki :

            </Text>}

            {ann.attachments?.map(att => (

              <Button
              mode="text"
              labelStyle={{ color: 'black',fontSize: 14,}}
              compact={true}
              uppercase={false}
              style={{alignSelf:"flex-start"}}
              key={att.id}
              onPress={e => onFileDownload(att.id, att.fileName)}
              >
               {att.fileName}
              </Button>
             
            )
            )}
           
         
            
      
              </Card.Content> 
            </Card>
         
    )
}


export default AnnouncementDetails;