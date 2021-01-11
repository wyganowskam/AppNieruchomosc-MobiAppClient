import React, { useState, useEffect } from "react";
import surveyService from '../../services/surveyService';
import { View, FlatList, ScrollView,StyleSheet ,Image } from 'react-native';
import { Button } from 'react-native-paper';
import { Text,Divider,Card, } from 'react-native-paper';
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

  const onAnswerChangeMultipleChoice = (i, checked, label) => {
    if(checked){
        setAnswers(ans => {
            if(!ans[i].includes(label)){
                ans[i].push(label);
            }
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
    <ThemeProvider theme={theme}>

    {survey.isFilled &&
    <Alert style={{marginBottom:15, maxWidth:970}} severity="info">
        Wypełniłeś/-aś już tą ankietę
    </Alert>
    }

    {survey.acceptAnswers === false &&
    <Alert style={{marginBottom:15, maxWidth:970}} severity="info">
        Upłynał termin wypełnienia ankiety.
    </Alert>
    }

    {!loadingSurvey &&
    <div style={{textAlign: 'left', wordWrap: 'break-word', maxWidth:1000}}>
    <Box border={2} id="question-div" style={{padding:20,
        marginBottom: 20, borderRadius:3, borderColor: '#ddd', backgroundColor: '#f5f5f5'}}>
        <Typography variant="body1" style={{marginBottom:15}}>
            <strong>{survey.title}</strong>
        </Typography>
        <Typography variant="body2" style={{whiteSpace: 'pre-line', marginBottom: 15}}>
            {survey.description}
        </Typography>
        <Typography variant="body2" style={{marginBottom:15}}>
            Przyjmuje odpowiedzi do&nbsp; <strong>{survey.acceptAnswersDeadlineFormatted}</strong>.
        </Typography>
    </Box>

    {survey.questions?.map((q, i) => (
        <Box key={q.id} border={q.typeKey === "Open" ? 0 : 2} 
        style={{padding:q.typeKey === "Open" ? 0 : 20 , marginBottom: 30, borderRadius:3, borderColor: '#ddd'}}>
        <Typography variant="body2" style={{marginBottom:15}}>
            <strong>{q.questionText}</strong>
        </Typography> 

        {q.typeKey === 'SingleChoice' && 
            <FormControl component="fieldset"
                disabled={(survey.isFilled || !survey.acceptAnswers)??true}
            >
            <RadioGroup
            value={(survey.isFilled ? q.myAnswers[0] : answers[i][0])??""} 
            onChange={e => onAnswerChangeSingleChoice(i, e.target.value)}
            >
                {q.predefinedAnswers?.map(ans => (
                      <FormControlLabel key={ans.id} value={ans.label} control={<Radio />} label={
                      <span>  
                          <strong>{ans.label}</strong>:&nbsp;{ans.answerText}
                      </span> } />
                ))}
            </RadioGroup>
            </FormControl>
        }

        
        {q.typeKey === 'MultipleChoice' && 
            <FormControl component="fieldset"
                disabled={(survey.isFilled || !survey.acceptAnswers)??true}
            >
            <FormGroup>
            {q.predefinedAnswers?.map(ans => (
                <FormControlLabel
                    key={ans.id}
                    control={<Checkbox 
                    checked={(survey.isFilled ? q.myAnswers.includes(ans.label) : answers[i].includes(ans.label))??false} 
                    onChange={e => onAnswerChangeMultipleChoice(i, e.target.checked, ans.label)}  
                     />}
                label={
                    <span>  
                        <strong>{ans.label}</strong>:&nbsp;{ans.answerText}
                    </span> }
                />
            ))}
            </FormGroup>
            </FormControl>
        }

        {q.typeKey === 'Open' && 
            <TextField
                multiline
                color="secondary"
                rows={4}
                variant="outlined"
                fullWidth
                disabled={(survey.isFilled || !survey.acceptAnswers)??true}
                value={(survey.isFilled ? q.myAnswers[0] : answers[i][0])??""}
                onChange={e => onAnswerChangeOpen(i, e.target.value)}
            >
            </TextField>}

        </Box>
    ))}
    {isFormValid === false &&
        <Alert style={{marginBottom:15, maxWidth:970}} severity="error">
            {message}
        </Alert>}
    <Button disabled={(survey.isFilled || !survey.acceptAnswers || loadingSendAnswers)??true} variant="contained" style={{margin:20, marginLeft:0, textTransform: 'none'}}
        onClick={(e) => handleAdd()}>
        Wyślij odpowiedzi
    </Button>
    </div>}
    </ThemeProvider>
  );
}