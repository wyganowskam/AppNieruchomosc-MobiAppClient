import React, {useCallback} from 'react'
import { View, StyleSheet,  ScrollView,Image ,Linking ,Alert} from 'react-native';
import {Text, } from 'react-native-paper';
import colors from '../../config/colors';
import { Card, Title, Paragraph,Divider,Button } from 'react-native-paper';
import announcementService from '../../services/announcementService';

const supportedURL = "https://appnieruchomoscnew.z6.web.core.windows.net";

const AnnouncementDetails = (props) => {

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <Button style={{alignSelf:"flex-start"}} onPress={handlePress} >{children}</Button>;
  };

  
    const ann = props.announcement;
   // console.log(ann);
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
             // onPress={e => onFileDownload(att.id, att.fileName)}
              >
               {att.fileName}
              </Button>
             
            )
            )}

        {ann.attachments?.length > 0 &&
              <View>
                  <Text style={{fontSize:15,}} >
            Załączniki dostępne na stronie internetowej.

            </Text>
            <OpenURLButton url={supportedURL}>Otwórz stronę internetową</OpenURLButton>
              </View>
             }
           
         
            
      
              </Card.Content> 
            </Card>
         
    )
}


export default AnnouncementDetails;