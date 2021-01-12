import React, { useState, useEffect } from "react";
import surveyService from '../../services/surveyService';
import { View, FlatList, ScrollView,StyleSheet ,Image } from 'react-native';
import { Button } from 'react-native-paper';
import { Text,Divider,Card,RadioButton, TextInput } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import colors from "../../config/colors";


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
        <Card  style={{margin:10,backgroundColor:colors.lightViolet,borderRadius:10,}}>
          <Card.Content>
            <Text style={{fontWeight:"600",fontSize:16,color:colors.button}}>{survey.title}</Text>
            <Text>{survey.description}</Text>
            <Divider style={{marginTop:10,marginBottom:10}}/>
            <Text>Przyjmuje odpowiedzi do <Text style={{fontWeight:"bold"}}>{survey.acceptAnswersDeadlineFormatted}</Text>.</Text>
           </Card.Content>
        </Card>

        
            
    {survey.questions?.map((q, i) => (

      <Card style={{margin:10,backgroundColor:colors.white,}}>
      <Card.Content>
        
        <Text style={{color:colors.button,fontWeight:"bold"}}>{i+1 + ". " + q.questionText}</Text>
            

        {q.typeKey === 'SingleChoice' && 
           

           
            <View>
             <Text style={{color:colors.grey,fontSize:12}} >Pytanie jednokrotnego wyboru</Text>
            <RadioButton.Group  
            value={(survey.isFilled ? q.myAnswers[0] : answers[i][0])??""} 
            onValueChange={newValue => onAnswerChangeSingleChoice(i, newValue)}
            >
                
                {q.predefinedAnswers?.map(ans => (
                    <View style={{flexDirection:"row"}} >
                      <RadioButton value={ans.label} 
                      disabled={(survey.isFilled || !survey.acceptAnswers)??true}
                      />
                      <Text style={{marginTop:10}}><Text style={{fontWeight:"bold"}}>{ans.label +": "}</Text>{ans.answerText}</Text> 
                    </View>
                ))}
                </RadioButton.Group>
                </View>
         
        }

        
        {q.typeKey === 'MultipleChoice' && 
           
            <View>
            <Text style={{color:colors.grey,fontSize:12}} >Pytanie wielokrotnego wyboru</Text>
            {q.predefinedAnswers?.map(ans => (
                 <View style={{flexDirection:"row"}}>
                    <RadioButton 
                    status={ survey.isFilled ? (q.myAnswers.includes(ans.label) ? 'checked' : 'unchecked') : (answers[i].includes(ans.label)?'checked' : 'unchecked') }
                     onPress={e => onAnswerChangeMultipleChoice(i, ans.label)}  
                     disabled={(survey.isFilled || !survey.acceptAnswers)??true}
                    value={ans.label} />
                     <Text style={{marginTop:10}}><Text style={{fontWeight:"bold"}}>{ans.label +": "}</Text>{ans.answerText}</Text> 
               </View>
             
            ))}
            </View>
           
        }

        {q.typeKey === 'Open' && 
        <View>
          <Text style={{color:colors.grey,fontSize:12}} >Pytanie otwarte</Text>
         
            <TextInput
                
                label="Odpowiedź"
                multiline
                style={{height:100,backgroundColor:colors.lightWhite,margin:5,}}
               
                disabled={(survey.isFilled || !survey.acceptAnswers)??true}
                value={(survey.isFilled ? q.myAnswers[0] : answers[i][0])??""}
                onChangeText={t => onAnswerChangeOpen(i, t)}
              />
              {/* <TextInput
              label="Treść zgłoszenia"
              multiline
              style={{height:250,backgroundColor:colors.lightWhite}}
              value={description}
              onChangeText={(description) => this.setState({description,message:""})}
            />  */}
               </View>}

            </Card.Content>
           </Card>
    ))}
    {isFormValid === false &&
        <Text>
            {message}
        </Text>}
    <Button 
        disabled={(survey.isFilled || !survey.acceptAnswers || loadingSendAnswers)??true} 
        style={{margin:20, backgroundColor:colors.button}}
        mode="contained"
        onClick={(e) => handleAdd()}>
        Wyślij odpowiedzi
    </Button>
    </View>}
    </ScrollView>
  );
}