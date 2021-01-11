import React, { useState, useEffect } from "react";
import surveyService from '../../services/surveyService';
import { View, FlatList, ScrollView,StyleSheet ,Image } from 'react-native';
import { Button } from 'react-native-paper';
import { Text,Divider,Card,RadioButton } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import colors from "../../config/colors";
import { TextInput } from "react-native-gesture-handler";



export default function CreateSurvey(props) {


    const {surveyId} = props;
  const [survey, setSurvey] = useState({});
  const [loadingSendAnswers, setLoadingSendAnswers] = useState(false);
  const [loadingSurvey, setLoadingSurvey] = useState(true);
  const [message, setMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [answers, setAnswers] = useState([]);

  const loadSurvey = () => {
    setLoadingSurvey(true);
      surveyService.getSurveyDetails(surveyId).then(res => {
        setSurvey(res.data);
        
        for(let i=0; i < res.data.questions.length; i++){
            if(res.data.questions[i].typeKey === 'Open'){
                answers.push([""]);
            }
            else{
                answers.push([]);
            }
        }
        setLoadingSurvey(false);
      }, error => {
        setLoadingSurvey(false);
      }).catch(() => {
        setLoadingSurvey(false);
      })
  }

  useEffect(()=>{
    loadSurvey();
   
  }, [surveyId]);



  const validate= () => {
    for(let i=0; i< answers.length; i++){
        if(answers[i].length < 1){
            setIsFormValid(false);
            setMessage("Należy udzielić odpowiedzi na wszystkie pytania zamknięte. W przypadku pytania wielokrotnego wyboru należy wskazać co najmniej jedną odpowiedź");
            return false;
        }
    }
    setIsFormValid(true);
    return true;
  }

  const onAnswerChangeSingleChoice = (i, val) => {
   
    setAnswers(ans => {
        ans[i] = [val];
        return [...ans];
    })
  }

  const onAnswerChangeMultipleChoice = (i, label) => {
    
    if(!answers[i].includes(label)){//jesli jescze nie ma
        setAnswers(ans => {
            ans[i].push(label);
            return [...ans];
        })
    }
    else{
        setAnswers(ans => {
            ans[i] = [...ans[i].filter(a => a !== label)];
            return [...ans]
        })
    }
  }
  
  const onAnswerChangeOpen = (i, val) => {
    setAnswers(ans => {
        ans[i] = [val];
        return [...ans];
    })
  }

  const handleAdd = () => {
    setMessage("");

    let isValid = validate();

    if(isValid === true){
    let answersToSend = [];
    for(let i=0; i< answers.length; i++){
        for(let j=0; j< answers[i].length; j++){
            answersToSend.push({
                surveyQuestionId: survey.questions[i].id,
                answer: answers[i][j]
            })
        }
    }
    setLoadingSendAnswers(true);
      surveyService.answerSurvey({
        surveyId: survey.id,
        answers: answersToSend
    }).then(
        (result) => {
            setLoadingSendAnswers(false);
            loadSurvey();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoadingSendAnswers(false);
          setIsFormValid(false);
          setMessage(resMessage);

        }
      );
    }
  };

  return (
 <ScrollView>
    {survey.isFilled &&
    <Card style={{ margin:10 , backgroundColor:colors.happyGreen}}>
      <Card.Content>
      <Text >
        Wypełniłeś/-aś już ten formularz
       </Text>
      </Card.Content>
    </Card>
   
    }

    {survey.acceptAnswers === false &&
    <Card style={{ margin:10 , backgroundColor:colors.happyGreen}}>
    <Card.Content>
    <Text>
        Upłynał termin wypełnienia formularza.
    </Text>
    </Card.Content>
  </Card>
    }

    {!loadingSurvey &&
    <View>
        <View>
        <Text>{survey.title}</Text>
        <Text>{survey.description}</Text>
        <Text>Przyjmuje odpowiedzi do <Text style={{fontWeight:"bold"}}>{survey.acceptAnswersDeadlineFormatted}</Text>.</Text>
        
        </View>

    {survey.questions?.map((q, i) => (
        <View>
        <Text>{q.questionText}</Text>
            

        {q.typeKey === 'SingleChoice' && 
           
            <View>
            
            <RadioButton.Group  
            value={(survey.isFilled ? q.myAnswers[0] : answers[i][0])??""} 
            onValueChange={newValue => onAnswerChangeSingleChoice(i, newValue)}
            >
                
                {q.predefinedAnswers?.map(ans => (
                    <View >
                      <RadioButton value={ans.label} 
                      disabled={(survey.isFilled || !survey.acceptAnswers)??true}
                      />
                      <Text><Text style={{fontWeight:"bold"}}>{ans.label}</Text>{ans.answerText}</Text> 
                    </View>
                ))}
                </RadioButton.Group>
                </View>
         
        }

        
        {q.typeKey === 'MultipleChoice' && 
           
            <View>
            {q.predefinedAnswers?.map(ans => (
                 <View>
                    <RadioButton 
                    status={ survey.isFilled ? (q.myAnswers.includes(ans.label) ? 'checked' : 'unchecked') : (answers[i].includes(ans.label)?'checked' : 'unchecked') }
                     onPress={e => onAnswerChangeMultipleChoice(i, ans.label)}  
                     disabled={(survey.isFilled || !survey.acceptAnswers)??true}
                    value={ans.label} />
                    <Text><Text style={{fontWeight:"bold"}}>{ans.label}</Text>{ans.answerText}</Text> 
               </View>
             
            ))}
            </View>
           
        }

        {q.typeKey === 'Open' && 
            <TextInput
                
                label="Odpowiedź"
                style={{width:300}}
                mode="outlined"
                disabled={(survey.isFilled || !survey.acceptAnswers)??true}
                value={(survey.isFilled ? q.myAnswers[0] : answers[i][0])??""}
                onChangeText={t => onAnswerChangeOpen(i, t)}
                
            >
            </TextInput>}

        </View>
    ))}
    {isFormValid === false &&
        <Text>
            {message}
        </Text>}
    <Button disabled={(survey.isFilled || !survey.acceptAnswers || loadingSendAnswers)??true} variant="contained" style={{margin:20, marginLeft:0, textTransform: 'none'}}
        onClick={(e) => handleAdd()}>
        Wyślij odpowiedzi
    </Button>
    </View>}
    </ScrollView>
  );
}