import React, { useState } from 'react';
import {acceptInvitation} from '../../services/invitationService';
import { Text,
  Button, Divider,Card,  } from 'react-native-paper';
import colors from '../../config/colors';
export const primaryCyanLight = '#00bcd4';


export default function Row(props) {
  const row = props.row;
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    setLoading(true);
    acceptInvitation({
      invitationId: row.id
    }).then(
      (res) => {
        if(res.status === 200) setReload(reloadOld => !reloadOld);
        this.props.navigation.goBack();
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

      <Card style={{margin:10,}}>
      
        <Card.Content>
          <Text>{row.hoaName}</Text>
        </Card.Content>
       
        <Card.Actions >
        <Button loading={loading} onPress={handleSave} labelStyle={{color:colors.button}}>  
                Akceptuj  
          </Button >
          
        </Card.Actions>
      </Card>

  );
}