import React, { useState, useEffect } from 'react'
import surveyService from '../../services/surveyService';
import { View, FlatList, ScrollView,StyleSheet ,Image } from 'react-native';
import { Button } from 'react-native-paper';
import { Text,Divider,Card, } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import colors from "../../config/colors";

export default function Surveys(props) {

    const [page, setPage] = useState(1);
    const [surveys, setSurveys] = useState([]);
    //const [isNewPage, setIsNewPage] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    //const {isAppAdmin, isBuildingAdmin, isBoard} = props.permissions;
    //const {setLinearLoading} = props;
    //const canCreateSurvey = isAppAdmin || isBuildingAdmin || isBoard;

    useEffect(() => {
        surveyService.getTotalPages().then(
            res => {
                setTotalPages(res.data);
                    
            },
            (error) => {
              
            }
          ).catch(e => { });
    }, []);

    useEffect(() => {
        surveyService.getSurveys(page).then(
            res => {
                    //setIsNewPage(false);
                    setSurveys(res.data);
                   // setIsNewPage(true);       
            },
            (error) => {
            }
          ).catch(e => {  });
    }, [page]);

    const previousPage = () => {
        if (page>1) setPage(page-1); 
    }

    const nextPage = () => {
        if (page<totalPages) setPage(page+1); 
    }

    const renderRow = ({ item }) => {
      const icon= item.isVoting===true ? require('../../assets/icons/manual-voting.png') : require('../../assets/icons/clipboard.png');
     
        return (
          <>
          <Card  style={{marginBottom:4,marginLeft:7, marginRight:7,borderRadius:20,marginTop:3}} 
          
           onPress={()=>props.navigation.navigate("SurveyDet",{surveyId:item.id})}
           >
         
              <Card.Title  
                subtitle={item.title} 
                subtitleNumberOfLines={2}
                subtitleStyle={{fontSize:18, color:colors.black,margin:0, flexWrap:"wrap"}} 
                left={()=><Image style={{width:30,height:30,alignSelf:"center",margin:0}} source={icon} />} 
                leftStyle={{margin:0,paddingRight:0}}
              />
              <Card.Content>
                <Divider style={{ marginBottom:5}} />
                <View style={{flexDirection:"row",justifyContent:"space-between",flex:1}}>
                    <Text >{item.created}</Text> 
                    <Text style={{alignSelf:"flex-end",textAlign:"right"}}> {item.acceptAnswers ? "Przyjmuje odpowiedzi" : "Ankieta zakończona"}</Text> 
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
        onPress={() =>{props.navigation.navigate('NewSurvey')}}  
        />
        </View>
        
         <ScrollView>
             <Divider style={{ backgroundColor:colors.violet,marginBottom:3}} />
            <FlatList
            data={surveys}
            keyExtractor={(a) => a.id}
            renderItem={renderRow}
            />
        </ScrollView> 

     
    </View> 
     
    )
   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
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