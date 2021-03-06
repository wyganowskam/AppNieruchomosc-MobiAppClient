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
    const [announcements, setAnouncements] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
        announcementService.getAnnouncementsPagesCount().then(
            res => {
                setTotalPages(res.data); 
                setPage(1);      
            },
            (error) => {
              
            }
          ).catch(e => { });
    }, []);

    useEffect(() => {
        announcementService.getAnnouncements(page).then(
            res => {
              
                    setAnouncements(res.data);
                    setLoading(false);
                         
            },
            (error) => {
              
            }
          ).catch(e => { });
    }, [page]);


    const previousPage = () => {
        if (page>1) setPage(page-1); 
    }

    const nextPage = () => {
        if (page<totalPages) setPage(page+1); 
    }

    const renderRow = ({ item }) => {
  
        return (
          <>
          <Card  style={{marginBottom:4,marginLeft:7, marginRight:7,borderRadius:20,marginTop:3}} 
          
           onPress={()=>props.navigation.navigate("AnnoucmentDet",{announcementId:item.id})}>
         
              <Card.Title  
                subtitleNumberOfLines={2}
                subtitle={item.title} 
                subtitleStyle={{fontSize:18, color:colors.black,margin:0}} 
              
                left={()=><Image style={{width:30,height:30,alignSelf:"center",margin:0}} source={require('../../assets/icons/pin.png')} />} 
                leftStyle={{margin:0,paddingRight:0}}
              />
              <Card.Content>
                <Divider style={{ marginBottom:5}} />
                <View style={{flexDirection:"row",justifyContent:"space-between",flex:1}}>
                    <Text >{item.created}</Text> 
                    <Text style={{alignSelf:"flex-end",textAlign:"right"}}>{"Komentarzy: "+ item.numberOfComments}</Text> 
                </View>
            
              </Card.Content> 
            </Card>
          </>
        );
      };

    return (
        <View style={styles.container}>
      
        <View style={{height:50,backgroundColor:colors.white,flexDirection:"row",padding:10}}>
        <Button
            mode="text"
            labelStyle={styles.TransparentButtonText}
            compact={true}
            uppercase={false}
            onPress={previousPage}
            style={{alignSelf:"center"}}
          > <Image style={{width:20,height:20,alignSelf:"center"}} source={require('../../assets/icons/left-arrow-bold.png')} />
              
            </Button>
        <Text style={{fontSize:20,alignSelf:"center",marginLeft:6,paddingBottom:2}}>
        {page} </Text>
          <Button
            mode="text"
            labelStyle={styles.TransparentButtonText}
            compact={true}
            uppercase={false}
            onPress={nextPage}
            style={{alignSelf:"center"}}
          > <Image style={{width:20,height:20,alignSelf:"center"}} source={require('../../assets/icons/right-arrow-bold.png')} />
              
            </Button>
          <FAB
        style={styles.fab}
        small
        icon={props=><Image style={{width:20,height:20,alignSelf:"center",marginTop:2}} source={require('../../assets/icons/plus.png')} />}
        onPress={() =>{props.navigation.navigate('AnnoucmentAdd')}}  
        />
        </View>
        
       
             <Divider style={{ backgroundColor:colors.violet,marginBottom:3}} />
             {announcements.length<1 &&  !loading &&
            <Card style={{margin:10, marginTop:60, height:50, backgroundColor:colors.happyGreen,alignSelf:"center"}}>
              <Card.Content>
              <Text >Brak ogłoszeń</Text>
              </Card.Content>
            </Card>}
            <FlatList
            data={announcements}
            keyExtractor={(a) => a.id}
            renderItem={renderRow}
            />
    

     
    </View> 
     
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.beige,
    },
    fab: {
        position: 'absolute',
        margin: 15,
        right: 0,
        top: 0,
        backgroundColor: colors.delicateButton,
        marginTop:5
      },
     
});
