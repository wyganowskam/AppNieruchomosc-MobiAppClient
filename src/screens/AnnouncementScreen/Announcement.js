import React, { useState, useEffect } from 'react'
import announcementService from '../../services/announcementService'
import AnnouncementDetails from './AnnDetails'
import AnnouncementComments from './AnnComments'
import {View, FlatList, ScrollView,StyleSheet ,Image} from 'react-native'
import {Divider,Button, Text, Switch, Card,Chip, TextInput} from 'react-native-paper';
import colors from "../../config/colors";




export default function AnnDet(props) {
  const [value, setValue] = React.useState(0);
  const announcementId = props.route.params.announcementId;
  const [announcement, setAnnouncement] = useState({});

  useEffect(() => {

     

      announcementService.getAnnouncementDetails(announcementId).then(
          res => {         
              setAnnouncement(res.data); 
          },
          (error) => {
            props.navigation.goBack();
          }
        ).catch(e => {  props.navigation.goBack(); });
  }, [announcementId]);

  


  return (
    <ScrollView style={{backgroundColor: colors.light}}>
 
     
       
        <AnnouncementDetails announcement={announcement} />
        
      
        <AnnouncementComments announcement={announcement} announcementId={announcementId} />
       
      </ScrollView>
  );
}
