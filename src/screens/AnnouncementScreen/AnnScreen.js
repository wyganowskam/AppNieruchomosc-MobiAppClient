import React, { useState, useEffect } from 'react'
import announcementService from '../../services/announcementService'
import { View, FlatList, ScrollView,StyleSheet ,Image } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { Text,Divider,Card, } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import colors from "../../config/colors";




export default function Announcements(props){

    const [page, setPage] = useState(1);
    const [announcements, setAnouncements] = useState([{ala:1},{ala:2}]);
    const [isNewPage, setIsNewPage] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // announcementService.getAnnouncementsPagesCount().then(
        //     res => {
        //         setTotalPages(res.data);       
        //     },
        //     (error) => {
              
        //     }
        //   ).catch(e => { });
    }, []);

    useEffect(() => {
        // announcementService.getAnnouncements(page).then(
        //     res => {
        //             setIsNewPage(false);
        //             setAnouncements(res.data);
        //             setIsNewPage(true);       
        //     },
        //     (error) => {
              
        //     }
        //   ).catch(e => { });
    }, [page]);


    const onPageChange = (e, pageNr) => {
        console.log(pageNr);
        setPage(pageNr);
    }

    const renderRow = ({ item }) => {
   
        return (
          <>
          <Card  style={{marginBottom:4,marginLeft:7, marginRight:7,borderRadius:20,marginTop:3}} >
              <Card.Title  
                title="Tytuł" 
                subtitle="opis" 
                titleStyle={{fontSize:18, color:colors.black,margin:0}} 
                subtitleStyle={{fontSize:14,color:colors.grey}}
                left={()=><Image style={{width:30,height:30,alignSelf:"center",margin:0}} source={require('../../assets/icons/loud-speaker.png')} />} 
                leftStyle={{margin:0,paddingRight:0}}
              />
              <Card.Content>
                <Divider style={{ marginBottom:5}} />
                <View style={{flexDirection:"row",justifyContent:"space-between",flex:1}}>
                    <Text >{"data"}</Text> 
                    <Text style={{alignSelf:"flex-end",textAlign:"right"}}>{"Komentarz"}</Text> 
                </View>
              
              </Card.Content> 
            </Card>
          </>
        );
      };

    return (
        <View style={styles.container}>
      
        <View>
          {/* paging */}
         
        </View>
        
         <ScrollView>
             <Divider style={{ backgroundColor:colors.violet}} />
            <FlatList
            data={announcements}
            keyExtractor={(a) => a.chatId}
            renderItem={renderRow}
            />
        </ScrollView> 

        <FAB
        style={styles.fab}
        small
        icon="plus"
        //onPress={() =>{this.props.navigation.navigate('NewMessage')}}  
        />
    </View> 
     
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundViolet,
    },
    fab: {
        position: 'absolute',
        margin: 15,
        right: 0,
        top: 0,
        backgroundColor: colors.violet
      },
     
});
