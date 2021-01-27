import React, { useState } from 'react';
import {acceptInvitation} from '../../services/invitationService';
import { Text,
  Button, Divider,Card,  } from 'react-native-paper';
import colors from '../../config/colors';
export const primaryCyanLight = '#00bcd4';
import authHeader from "../../services/authHeader";
import { getHoasRoles } from '../../services/hoaService';


export default function Row(props) {
  const row = props.row;
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    setLoading(true);
    acceptInvitation({
      invitationId: row.id
    }).then(
      (res) => {
        setLoading(false);
        props.getInvitationList();
        props.navigation.reset({
          index: 1,
          routes: [{ name: 'Main' }, {name:'MyInvitations'}],
        });
      },
      (error) => {
       
        const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log(resMessage);
      
      }
    ).catch(e => { setLoading(false); });
    setLoading(false);
  };
  return (

      <Card style={{margin:10, height:100}}>
      
        <Card.Content>
          <Text style={{fontSize:18}}>{row.hoaName}</Text>
        </Card.Content>
       
        <Card.Actions >
        <Button loading={loading} onPress={handleSave} labelStyle={{color:colors.button}}>  
                Akceptuj  
          </Button >
          
        </Card.Actions>
      </Card>

  );
}