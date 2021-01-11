import React, { useState, useEffect } from "react";
import { View, FlatList, ScrollView,StyleSheet ,Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Text,Divider,Card, } from 'react-native-paper';
import CreateSurveyAnswers from './CreateSurveyAnswers';
import surveyService from '../../services/surveyService';
import { FAB } from 'react-native-paper';
import colors from "../../config/colors";
import DateTimePicker from '@react-native-community/datetimepicker';


function CreateSurvey(props) {
  const maxQuestions = 10;
  const maxAnswers = 10;

  let questionsArr = [];
  let qanswersCountArr =[];

  for (let i = 0; i < maxQuestions; i++){
    questionsArr.push({});
    questionsArr[i].answers = [];
    for (let j = 0; j < maxAnswers; j++){
      questionsArr[i].answers.push({});
    }
    qanswersCountArr[i] = 1;
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([...questionsArr]);
  const [questionsCount, setQuestionsCount] = useState(1);
  const [qanswersCount, setQanswersCount] = useState([...qanswersCountArr]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [deadline, setDeadline] = useState("");
  
  useEffect(()=>{
    
    surveyService.getQuestionTypes().then(res => {
      setQuestionTypes(res.data);
    }, (error) => {}).catch(() => {});

  }, []);

  const onChangeTitle = e => {
    const email = e.target.value;
    setTitle(email);
  };

  const onChangeDescription = e => {
    const desc = e.target.value;
    setDescription(desc);
  };

  const onPlusClick = e => {
    if(questionsCount >= maxQuestions) return;
    setQuestionsCount(x => x + 1);
  };

  const onMinusClick = e => {
    if(questionsCount === 1) return;
    setQuestionsCount(x => x - 1);
  };

  const onQuestionTextChange = (i, val) => {
    setQuestions(prop => {
      prop[i].questionText =  val;
      return [...prop];
    })
  };

  const onQuestionTypeChange = (i, val) => {
    setQuestions(prop => {
      prop[i].type = val;
      return [...prop];
    })
  };


  const onQuestionAnswerLabelChange = (i, j, val) => {
    setQuestions(prop => {
      prop[i].answers[j].label =  val;
      return [...prop];
    })
  };

  const onQuestionAnswerTextChange = (i, j, val) => {
    setQuestions(prop => {
      prop[i].answers[j].answerText =  val;
      return [...prop];
    })
  };

  const setAnswersCount = (i, count) => {
    setQanswersCount(arr => {
      arr[i] = count;
      return [...arr];
    });
  }

  const validate= () => {
    if(!title || !description || !deadline || deadline === ""){
        setMessage("Wypełnij wszystkie wymagane pola");
        setIsFormValid(false);
        return false;
    }
    else if(title.length<10){
      setMessage("Tytuł musi mieć minimum 10 znaków");
      setIsFormValid(false);
      return false;
    }
    else if(title.length>100){
      setMessage("Tytuł może mieć maksymalnie 100 znaków");
      setIsFormValid(false);
      return false;
    }
    else if(description.length>1000){
      setMessage("Opis może mieć maksymalnie 1000 znaków");
      setIsFormValid(false);
      return false;
    }
    else{
      for (let i = 0; i < questionsCount; i++){
        if(!questions[i].type || !questions[i].questionText){
          setMessage("Wypełnij wszystkie wymagane pola");
          setIsFormValid(false);
          return false;
        }
        else if(questions[i].questionText.length < 5){
          setMessage("Treść pytania musi mieć co najmniej 5 znaków");
          setIsFormValid(false);
          return false;
        }
        else if(questions[i].questionText.length > 250){
          setMessage("Treść pytania może mieć maksymalnie 250 znaków");
          setIsFormValid(false);
          return false;
        }

        
        
          if(questions[i].type === 'SingleChoice' || questions[i].type==='MultipleChoice'){
            console.log(questions[i].answers);
            console.log(qanswersCount[i]);
            for(let j = 0; j < qanswersCount[i]; j++){
            if(!questions[i].answers[j].label || !questions[i].answers[j].answerText ||
              questions[i].answers[j].length === 0 || questions[i].answers[j].answerText.length === 0 ){
              setMessage("Wypełnij wszystkie wymagane pola");
              setIsFormValid(false);
              return false;
            }
            else if(questions[i].answers[j].label.length > 100){
              setMessage("Etykieta odpowiedzi moze miec maksymalnie 100 znakow");
              setIsFormValid(false);
              return false;
            }
            else if(questions[i].answers[j].answerText.length > 1000){
              setMessage("Tekst odpowiedzi moze miec maksymalnie 1000 znakow");
              setIsFormValid(false);
              return false;
            }
          }
        }
      }
      setIsFormValid(true);
      return true;
    }

  }
  const handleAdd = (e) => {
    // e.preventDefault();
    // setMessage("");
    // let isValid = validate();
    
    // if(isValid === true){
    //   console.log({
    //     title: title,
    //     description: description,
    //     acceptAnswersDeadline: deadline,
    //     questions: questions.slice(0, questionsCount).map((q, i) => {return {
    //       questionText: q.questionText,
    //       typeKey: q.type,
    //       predefinedAnswers: q.answers.slice(0, qanswersCount[i])
    //     }}),
    // });
    //   setLoading(true);
    //   surveyService.createSurvey({
    //       title: title,
    //       description: description,
    //       acceptAnswersDeadline: deadline,
    //       questions: questions.slice(0, questionsCount).map((q, i) => {return {
    //         questionText: q.questionText,
    //         typeKey: q.type,
    //         predefinedAnswers: q.answers.slice(0, qanswersCount[i])
    //       }}),
    //   }).then(
    //     (result) => {
    //       props.navigation.push('Surveys',{surveyId:id})
    //     },
    //     (error) => {
    //       const resMessage =
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString();

    //       setLoading(false);
    //       setIsFormValid(false);
    //       setMessage(resMessage);

    //     }
    //   );
    //   setLoading(false);
    // }
  };

  return (
     <ScrollView> 

      <View>
        {/* <form className={classesForm.form} noValidate onSubmit={handleAdd}> */}
        <TextInput
            label="Tytuł ankiety"
            onChangeText={onChangeTitle}
            style={{borderRadius:0}}
        />
        <TextInput
            label="Opis"
            onChangeText={onChangeDescription}
        />

        {/* FORMAT "2021-01-21T17:58" */}
           {/* <TextField
        label="Przyjmuje odpowiedzi do"
        type="datetime-local"
        color="secondary"
        style={{
          marginBottom:20,
          marginTop:20
        }}
        value={deadline}
        onChange={e => setDeadline(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      /> */}
        <View>
          <Text>Pytania</Text>
        <Button mode="outlined" style={{float:"left", marginRight:10}} onPress={onMinusClick}>
         -
        </Button>
        <Button mode="outlined" style={{float:"left"}} onPress={onPlusClick}>
          +
        </Button>
        </View>   
       
        {[...Array(questionsCount)].map((e, i) => 
        <View key={i} id="question-div" style={{textAlign: 'left', padding:10,paddingTop: 0,
        marginBottom: 20, borderRadius:3, borderColor: '#ddd'}}>

        <TextInput
            
            label="Treść pytania"
            
            style={{maxWidth:700}}
           onChangeText={e => onQuestionTextChange(i, e.target.value)}
        />
       {/* tuuuuuu */}
       <Text>Tu zzrobić wybór typu pytania</Text>
        {/* <TextInput
            style={{width:'100%'}}
            color="secondary"
            select
            required
            SelectProps={{
                MenuProps: {
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                },
                getContentAnchorEl: null
                }
            }}
            value = {questions[i]?.type??""}
            label="Rodzaj"
            onChange={e => onQuestionTypeChange(i, e.target.value)}
            >
            {
            questionTypes.map((type) => (
                <MenuItem key={type.type} value={type.type}>
                {type.description}
                </MenuItem>
            ))}
        </TextInput> */}
            {(questions[i]?.type === 'SingleChoice' || questions[i]?.type === 'MultipleChoice') 
            && <View>
            <CreateSurveyAnswers 
              maxAnswers={maxAnswers}
              onQuestionAnswerLabelChange={onQuestionAnswerLabelChange}
              onQuestionAnswerTextChange={onQuestionAnswerTextChange}
              questionNumber={i}
              setParentAnswersCount={setAnswersCount}
            /> </View>}
        
        </View>)}

        {!isFormValid && <View style={{marginBottom: 20}}><Text>{message} </Text></View>}
        <Button
            mode="contained"
            disabled={loading}
            style={{width:200}}
            onPress={handleAdd}
        >
        Stwórz ankietę
        </Button>
        {/* </form> */}
        </View>
    </ScrollView>  
  );
}


export default  CreateSurvey;