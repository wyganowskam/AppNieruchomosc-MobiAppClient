import React from 'react';
import {  ScrollView, } from 'react-native';
import { Text } from 'react-native-paper';
import colors from "../../config/colors";
import SurveyFill from './SurveyFillScreen';
import SurveyResults from './SurveyResultsScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();



export default function Survey(props) {
 
  const [value, setValue] = React.useState(0);
  const surveyId = props.route.params.surveyId;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function FillScreen() {
    return (
      <SurveyFill surveyId={surveyId}/>
    );
  }
  
  function ResultsScreen() {
    return (
      <SurveyResults surveyId={surveyId}/>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="A" component={FillScreen} />
      <Tab.Screen name="B" component={ResultsScreen}  />
    </Tab.Navigator>
  );
}

