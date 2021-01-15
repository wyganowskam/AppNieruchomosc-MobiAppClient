import React, { useState, useEffect } from "react";
import { View, FlatList, ScrollView,StyleSheet ,Image } from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';
import { Text,Divider,Card, } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import colors from "../../config/colors";

export default function CreateHoaAnswers(props) {
  const {maxAnswers, onQuestionAnswerLabelChange, onQuestionAnswerTextChange, 
    questionNumber, setParentAnswersCount} = props;
  const [answers, setAnswers] = useState([]);
  const [answersCount, setAnswersCount] = useState(1);
  
  useEffect(()=>{
    for (let i = 0; i < maxAnswers; i++){
      answers.push({});
    }
  });

  const onPlusClick = e => {
    if(answersCount >= maxAnswers) return;
    setAnswersCount(x => {
      setParentAnswersCount(questionNumber, x + 1);
      return x + 1;
    });
  };

  const onMinusClick = e => {
    if(answersCount === 1) return;
    setAnswersCount(x => {
      setParentAnswersCount(questionNumber, x - 1);
      return x - 1;
    });
  };


  return (
    // <></>
    <View>

        <View style={{flexDirection:"row"}}>
          <Text>
            Odpowiedzi</Text>
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
        <View key={i}>
          
          <TextInput
            
            id="title"
            label="Etykieta"
            style={{width:'19%', marginRight: '2%'}}
            onChangeText ={e => onQuestionAnswerLabelChange(questionNumber, i, e.target.value)}
        />
                  
          <TextInput
            
            id="title"
            label="Treść odpowiedzi"
            name="title"
            style={{width:'79%'}}
            onChangeText={e => onQuestionAnswerTextChange(questionNumber, i, e.target.value)}
        />
        {/* {i !== answersCount-1 && <Divider style={{marginTop:15}} /> } */}
        </View>)}

        </View>
  );
}