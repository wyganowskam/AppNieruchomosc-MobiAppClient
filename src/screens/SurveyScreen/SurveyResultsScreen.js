import React, { useState, useEffect } from "react";
import { View, FlatList, ScrollView,StyleSheet ,Image } from 'react-native';
import { Button } from 'react-native-paper';
import { Text,Divider,Card, } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import colors from "../../config/colors";
import surveyService from '../../services/surveyService';

export default function SurveyResults(props) {

  const {surveyId} = props;
  const [survey, setSurvey] = useState({});
  const [questionResults, setQuestionResults] = useState([]);
  const [canSeeResults, setCanSeeResults] = useState(undefined);

  const loadSurveyResults = () => {
    surveyService.getSurveyResults(surveyId).then(res => {

      setSurvey(res.data.survey);
      setQuestionResults(res.data.questionResults);
      setCanSeeResults(res.data.canSeeResults);
    }, error => {
    }).catch(() => {});
  }

  useEffect(() => {
    loadSurveyResults();
  }, []);

  return (
    <ScrollView>
      {canSeeResults === false &&
      <Card style={{margin:10,backgroundColor:colors.happyGreen}}>
        <Card.Content>
            <Text >
              Nie posiadasz uprawnień do wyświetlenia wyników. Wyniki będą dostępne dla wszystkich członków wspólnoty po upływie terminu przyjmowania odpowiedzi.
              </Text>
        </Card.Content>
      </Card>
     
      }
{/*  <Text><Text style={{fontWeight: "bold"}}>{"Adres: "} </Text> {"\n"}</Text> */}
      {canSeeResults && 
        <View >
          
          <Text style={{fontWeight:"bold"}}>{survey.title}</Text>
         
          {survey.questions.map((q, i) => (
            <Card style={{margin:10,backgroundColor:colors.white}}>
            <Card.Content>

            <Text style={{fontSize:14, color:colors.button,margin:0,fontWeight:"bold"}} >
                {i+1+ ". " + survey.questions[i].questionText} </Text>
            
            {q.predefinedAnswers?.map((ans, j) => (
              <Text><Text style={{fontWeight: "bold"}}>{ans.label+ ": "}</Text>{ans.answerText}</Text>
             
            ))}

            <Divider style={{marginTop:10, marginBottom:10}} />
          
            {q.predefinedAnswers?.map((ans, j) => (
                 <Text style={{color:colors.textViolet}}><Text style={{fontWeight: "bold",color:colors.black}}>
                   <Text style={{fontWeight: "bold"}}>{ans.label + ":  "}</Text>
                   
                   </Text >{questionResults[i]?.answersResults?.find(a=>a.label===ans.label)?.votes??0}&nbsp;głosów
                 {q.typeKey === 'SingleChoice' && `(${questionResults[i]?.answersResults?.find(a=>a.label===ans.label)?.votesPercent??0}%)`}</Text>
             
            ))}

            {questionResults[i].openAnswers?.filter(ans => ans.length > 0)?.map((text, j) => (
              <View key={j}>
              <Text>
                {text}
                </Text>
                <Divider style={{marginTop:10, marginBottom:10}} />
              </View>
            ))}

            </Card.Content>
            </Card>
          ))}

        </View>
      }

    </ScrollView>
  );
}