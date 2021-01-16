import React, { useState, useEffect } from "react";
import { View, FlatList, ScrollView,StyleSheet ,Image } from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';
import { Text,Divider,Card, } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import colors from "../../config/colors";

export default function CreateHoaAnswers(props) {
  const {maxAnswers, onQuestionAnswerLabelChange, onQuestionAnswerTextChange, 
    questionNumber, setParentAnswersCount,questions,answersCount,} = props;
  const [answers, setAnswers] = useState([]);
 
  
  useEffect(()=>{
    for (let i = 0; i < maxAnswers; i++){
      answers.push({});
    }
  });

  const onPlusClick = e => {
    if(answersCount >= maxAnswers) return;
    setParentAnswersCount(questionNumber, answersCount + 1);
  };

  const onMinusClick = e => {
    if(answersCount === 1) return;
    setParentAnswersCount(questionNumber, answersCount- 1);
  };


  return (
    // <></>
    <View>

        <View style={{flexDirection:"row"}}>
          <Text style={{color:colors.button, fontSize:15,alignSelf:"center"}}>
            Liczba odpowiedzi: </Text>
            <Text style={{alignSelf:"center", fontSize:18}}>{answersCount}</Text>
            <IconButton
                      icon={()=><Text style={{fontSize:18}}>-</Text>}
                      size={24}
                      onPress={onMinusClick}
                  />
            <IconButton
                      icon={()=><Text style={{fontSize:18}}>+</Text>}
                      size={24}
                      onPress={onPlusClick}
                  />
          </View>    
        <View/>
        {[...Array(answersCount)].map((e, i) => 
        <View key={i} style={{flexDirection:"row"}}>
          
          <TextInput
            
            id="title"
            label="Etykieta"
            value={questions[questionNumber].answers[i].label || ''}
            style={{width:'30%', marginRight: '2%',backgroundColor:colors.lightWhite}}
            onChangeText ={e => onQuestionAnswerLabelChange(questionNumber, i, e)}
        />
                  
          <TextInput
            
            id="title"
            label="Treść odpowiedzi"
            name="title"
            value={questions[questionNumber].answers[i]?.answerText || ''}
            style={{width:'68%',backgroundColor:colors.lightWhite}}
            onChangeText={e => onQuestionAnswerTextChange(questionNumber, i, e)}
        />
      
        </View>)}

        </View>
  );
}