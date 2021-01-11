import React from 'react';
import { View, FlatList, ScrollView,StyleSheet ,Image } from 'react-native';
import { Button } from 'react-native-paper';
import colors from "../../config/colors";
import SurveyFill from './SurveyFillScreen';
import SurveyResults from './SurveyResultsScreen';


export default function Survey(props) {
 
  const [value, setValue] = React.useState(0);
  const [tab, setTab] = React.useState(0);
  const surveyId = props.route.params.surveyId;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  
    <ScrollView>

    <View style={{flexDirection:"row",flex:1,backgroundColor:colors.white,}}>
        <Button 
        mode="text"  
        uppercase={true} 
        disabled={tab===0}
        onPress={()=> setTab(0)}
        style={tab===0 ? styles.chosen : styles.otherone}
        >
          formularz
        </Button>
        <Button 
        mode="text" 
        uppercase={true} 
        disabled={tab===1}
        onPress={()=> setTab(1)}
        style={tab===1 ? styles.chosen : styles.otherone}
        >
          wyniki
        </Button>
      </View>
     {tab===0 ?
      <SurveyFill surveyId={surveyId}/>
      :
      <SurveyResults surveyId={surveyId}/>
     }
      </ScrollView>
    
  );
}
const styles = StyleSheet.create({
  chosen: {flex:1,
      borderBottomColor:colors.violet,
       borderBottomWidth:3},
  otherone: {
      flex:1,
    },
   
});