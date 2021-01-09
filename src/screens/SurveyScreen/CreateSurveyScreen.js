import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import useStylesForm from '../../styles/formStyles';
import ErrorAlert from '../../components/ErrorAlert';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import CreateSurveyAnswers from './CreateSurveyAnswers';
import surveyService from '../../services/survey.service';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#aaa',
    },
  },
});


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

  const classesForm = useStylesForm();
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
    e.preventDefault();
    setMessage("");
    let isValid = validate();
    
    if(isValid === true){
      console.log({
        title: title,
        description: description,
        acceptAnswersDeadline: deadline,
        questions: questions.slice(0, questionsCount).map((q, i) => {return {
          questionText: q.questionText,
          typeKey: q.type,
          predefinedAnswers: q.answers.slice(0, qanswersCount[i])
        }}),
    });
      setLoading(true);
      surveyService.createSurvey({
          title: title,
          description: description,
          acceptAnswersDeadline: deadline,
          questions: questions.slice(0, questionsCount).map((q, i) => {return {
            questionText: q.questionText,
            typeKey: q.type,
            predefinedAnswers: q.answers.slice(0, qanswersCount[i])
          }}),
      }).then(
        (result) => {
          props.navigation.push('Surveys',{surveyId:id})
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setIsFormValid(false);
          setMessage(resMessage);

        }
      );
      setLoading(false);
    }
  };

  return (
      <ThemeProvider theme={theme}>    

      <div style={{margin: 10, marginTop: 10, maxWidth: 1200, textAlign: 'left'}}>
        <form className={classesForm.form} noValidate onSubmit={handleAdd}>
        <TextField
            variant="outlined"
            margin="normal"
            color="secondary"
            required
            fullWidth
            id="title"
            label="Tytuł ankiety"
            name="title"
            onChange={onChangeTitle}
            style={{borderRadius:0}}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            color="secondary"
            fullWidth
            multiline
            rows={3}
            id="desc"
            label="Opis"
            name="desc"
            onChange={onChangeDescription}
        />
           <TextField
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
      />
        <div style ={{marginBottom:50}}>
          <Typography style={{float:"left", marginTop:10, marginRight: 10}}>
            Pytania</Typography>
        <Button variant="outlined" style={{float:"left", marginRight:10}} onClick={onMinusClick}>
          <RemoveIcon />
        </Button>
        <Button variant="outlined" style={{float:"left"}} onClick={onPlusClick}>
          <AddIcon />
        </Button>
          </div>    
       
        {[...Array(questionsCount)].map((e, i) => 
        <Box border={2} key={i} id="question-div" style={{textAlign: 'left', padding:10,paddingTop: 0,
        marginBottom: 20, borderRadius:3, borderColor: '#ddd'}}>

        <TextField
            margin="normal"
            color="secondary"
            required
            fullWidth
            id="title"
            label="Treść pytania"
            name="title"
            style={{maxWidth:700}}
           onChange={e => onQuestionTextChange(i, e.target.value)}
        />
        <div style={{clear:'left'}} />
        <TextField
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
        </TextField>
            {(questions[i]?.type === 'SingleChoice' || questions[i]?.type === 'MultipleChoice') 
            && <div style={{marginTop:20}}> 
            <CreateSurveyAnswers 
              maxAnswers={maxAnswers}
              onQuestionAnswerLabelChange={onQuestionAnswerLabelChange}
              onQuestionAnswerTextChange={onQuestionAnswerTextChange}
              questionNumber={i}
              setParentAnswersCount={setAnswersCount}
            /> </div> }
        
        </Box>)}

        {!isFormValid && <div style={{marginBottom: 20}}><ErrorAlert message={message} /></div>}
        <Button
            type="submit"
            variant="contained"
            disabled={loading}
            style={{width:200}}
        >
        Stwórz ankietę
        </Button>
        </form>
    </div>
    </ThemeProvider>
  );
}


export default  CreateSurvey;