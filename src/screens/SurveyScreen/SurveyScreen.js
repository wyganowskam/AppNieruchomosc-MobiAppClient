import React from 'react';
import { View, FlatList, ScrollView,StyleSheet ,Image } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { Button } from 'react-native-paper';
import { Text,Divider,Card, } from 'react-native-paper';
import CreateSurveyAnswers from './CreateSurveyAnswers';
import surveyService from '../../services/surveyService';
import { FAB } from 'react-native-paper';
import colors from "../../config/colors";
import SurveyFill from './SurveyFillScreen';
import SurveyResults from './SurveyResultsScreen';


export default function Survey(props) {
 
  const [value, setValue] = React.useState(0);
  const surveyId = props.route.params.surveyId;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ScrollView>
      <Text>Survey fill</Text>
      <SurveyFill surveyId={surveyId}/>
      <Text>survey results</Text>
      <SurveyResults surveyId={surveyId}/>
   
      </ScrollView>
  );
}
