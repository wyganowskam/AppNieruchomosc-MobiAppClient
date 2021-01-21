import React, { useState, useEffect } from "react";
import { View, FlatList, ScrollView,StyleSheet ,Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Text,Divider,Card, } from 'react-native-paper';
import { Dialog, Portal,List ,IconButton} from 'react-native-paper';
import CreateSurveyAnswers from './CreateSurveyAnswers';
import surveyService from '../../services/surveyService';
import { FAB } from 'react-native-paper';
import colors from "../../config/colors";
import DateTimePicker from '@react-native-community/datetimepicker';
import { color } from "react-native-reanimated";


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
  const [isVoting, setIsVoting] = useState(false);
  const [questionTypes, setQuestionTypes] = useState([]);
 
  const [typeDialogVisible,setTypeDialogVisible]=useState(false);
  const [typeDialogNumber,setTypeDialogNumber]=useState(0);
  const [votingDialogVisible,setVotingDialogVisible]=useState(false);
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString]=useState('');
  const [showDate, setShowDate] = useState(false);
  const [time, setTime] = useState(new Date());
  const [timeString, setTimeString]=useState('');
  const [showTime, setShowTime] = useState(false);

  
  useEffect(()=>{
    
    surveyService.getQuestionTypes().then(res => {
      setQuestionTypes(res.data);
    }, (error) => {}).catch(() => {});

  }, []);

  const onChangeTitle = val => {
    setTitle(val);
  };

  const onChangeDescription = val => {
    setDescription(val);
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
      prop[i].type = val.type;
      prop[i].description=val.description;
      return [...prop];
    });
    setTypeDialogVisible(false);
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
    if(!title || !description || !date || !time ){
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
            // console.log(questions[i].answers);
            // console.log(qanswersCount[i]);
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
    const deadline= dateString +"T"+timeString;
   
    e.preventDefault();
    setMessage("");
    let isValid = validate();
    
    if(isValid === true){
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

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('acceptAnswersDeadline', deadline);
      formData.append('isVoting', isVoting);
      let questionsToSend = []
      for(let i=0; i < questionsCount; i++){
        questionsToSend.push({
          questionText: questions[i].questionText,
          typeKey: questions[i].type,
          predefinedAnswers: questions[i].answers.slice(0, qanswersCount[i])
        });
      }
      formData.append('questionsJson', JSON.stringify(questionsToSend));
      setLoading(true);
      surveyService.createSurvey(formData).then(
        (result) => {
          this.props.navigation.reset({
            index: 1,
            routes: [{ name: 'Main' }, {name:'Surveys'}],
          });
          // props.navigation.push('',{surveyId:id})
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

  const openDialog=(i)=> {
   
    setTypeDialogVisible(true);
    setTypeDialogNumber(i);
   
  }

  const hideDialog=()=> {
    setTypeDialogVisible(false);
  }

  const openVotingDialog=()=> {
    setVotingDialogVisible(true);
  }

  const hideVotingDialog=()=> {
    setVotingDialogVisible(false);
  }

  const onChangeDate=(newdate)=>{
   //setDate({date:date.nativeEvent.timestamp}); 
   setShowDate(false);
   if(newdate.type!="dismissed"){
    const d= new Date(newdate.nativeEvent.timestamp);
    const year=d.getFullYear();
    const month=d.getMonth();
    const day=d.getDate();
    const m= month<9 ? "0" : "";
    const n= day<10 ? "0" : "";
    const dd=year+"-"+ m+(month+1)+"-"+n+day;
    setDateString(dd);
    setDate(new Date(dd));
   }
  
  }

  const onChangeTime=(newtime)=>{
    setShowTime(false);
    if(newtime.type!="dismissed"){
        const d= new Date(newtime.nativeEvent.timestamp);
        const h=d.getHours();
        const m=d.getMinutes();
        const n= m<10 ? "0": "";
        const j=h<10? "0": "";
        const t=new Date().setHours(h,m);
        setTimeString(j+h+":"+n+m)
        setTime(t)
        
    }
    
   }

   const onSurveyTypeChange = (val) => {
    setIsVoting(val);
   
    if(val){
      for (let i = 0; i < maxQuestions; i++){
        const singleChoice=questionTypes.find(el=>el.type==='SingleChoice');
        onQuestionTypeChange(i,singleChoice);
        onQuestionTextChange(i, 'Wybierz odpowiedź');
        addVotingAnswers(i);
      }
    }
    else{
      for (let i = 0; i < maxQuestions; i++){
        clearQuestion(i);
      }
    }
   
    setVotingDialogVisible(false);
  }

  const addVotingAnswers = (i) => {
    setAnswersCount(i, 3);
    onQuestionAnswerLabelChange(i, 0, 'Tak');
    onQuestionAnswerTextChange(i, 0, 'Za');
    onQuestionAnswerLabelChange(i, 1, 'Nie');
    onQuestionAnswerTextChange(i, 1, 'Przeciw');
    onQuestionAnswerLabelChange(i, 2, 'Wstrzymano');
    onQuestionAnswerTextChange(i, 2, 'Głos wstrzymany');
  }

  const clearQuestion = (i) => {
    onQuestionTextChange(i, '');
    setAnswersCount(i, 1);
    for (let j = 0; j < maxAnswers; j++){
      onQuestionAnswerLabelChange(i, j, '');
      onQuestionAnswerTextChange(i, j, '');
    }
  
  }

 

 
  return (
     <ScrollView style={{margin:10}}> 


        <Card  style={{margin:10,backgroundColor:colors.lightViolet,borderRadius:10,}}>
          <Card.Content>
          <Text style={{color:colors.button, fontSize:16}}>Typ: </Text>
        <View style={{flexDirection:"row"}}>
          <Button
            mode="text"
            labelStyle={{}}
            compact={true}
            uppercase={false}
              onPress={openVotingDialog}
              style={{}}
            >
              {isVoting? "Głosowanie " : "Ankieta "}
              <Image style={{width:10,height:10,alignSelf:"center"}} source={require('../../assets/icons/down-arrow.png')} />
            </Button>
          </View>
          <Text style={{color:colors.button, fontSize:15}}>Przyjmuje odpowiedzi do: </Text>
          <View style={{flexDirection:"row"}}>
          <Button
            mode="text"
            labelStyle={{}}
            compact={true}
            uppercase={false}
              onPress={()=>setShowDate(true)}
              
            >
              {"Data: " + dateString+ " "}
              <Image style={{width:10,height:10,alignSelf:"center"}} source={require('../../assets/icons/down-arrow.png')} />
            </Button>
          </View>
          <View style={{flexDirection:"row"}}>
          <Button
            mode="text"
            labelStyle={{}}
            compact={true}
            uppercase={false}
              onPress={()=>setShowTime(true)}
             
            >
              {"Godzina: " + timeString+ " "}
              <Image style={{width:10,height:10,alignSelf:"center"}} source={require('../../assets/icons/down-arrow.png')} />
            </Button>
          </View>

          <TextInput
            label="Tytuł"
            onChangeText={t=>onChangeTitle(t)}
            value={title}
            style={{borderRadius:0,backgroundColor:colors.lightWhite}}
          />
          <TextInput
              label="Opis"
              multiline
              value={description}
              onChangeText={t=>onChangeDescription(t)}
              style={{borderRadius:0,height:100,backgroundColor:colors.lightWhite}}
          />

          <View style={{flexDirection:"row"}} >
            <Text style={{color:colors.button, fontSize:15,alignSelf:"center"}} >Liczba pytań: </Text>
            <Text style={{alignSelf:"center", fontSize:18}}>{questionsCount}</Text>
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


           </Card.Content>
        </Card>

      <View>
  
     
        <View>
          
          


      
        </View>   
       
        {[...Array(questionsCount)].map((e, i) => 
        <Card style={{margin:10,backgroundColor:colors.white,borderRadius:10,}} key={i}>
          <Card.Content>
          
        <Text style={{color:colors.button,fontWeight:"bold",fontSize:18}}>Pytanie {i+1}</Text>
        

        
        <View style={{flexDirection:"row",margin:0}}>
      <Button
           mode="text"
           labelStyle={{}}
           compact={true}
           uppercase={false}
           disabled={isVoting}
            onPress={()=>openDialog(i)}
          >{questions[i]?.description===undefined ? (isVoting ? "Pytanie jednokrotnego wyboru" :" Wybierz typ pytania ") : questions[i]?.description } 
            <Image style={{width:10,height:10,alignSelf:"center"}} source={require('../../assets/icons/down-arrow.png')} />

            
          </Button>
          
          </View>
          <TextInput
            
            label="Treść pytania"
            value={questions[i]?.questionText || ''}
            style={{borderRadius:0,backgroundColor:colors.lightWhite, }}
           onChangeText={t => onQuestionTextChange(i, t)}
        />
        
      
            {(questions[i]?.type === 'SingleChoice' || questions[i]?.type === 'MultipleChoice') 
            && 
             <CreateSurveyAnswers 
              maxAnswers={maxAnswers}
              onQuestionAnswerLabelChange={onQuestionAnswerLabelChange}
              onQuestionAnswerTextChange={onQuestionAnswerTextChange}
              questionNumber={i}
              questions={questions}
              setParentAnswersCount={setAnswersCount}
              answersCount={qanswersCount[i]}
            /> 
             }


         
        
       
        </Card.Content>
        </Card>)
        
        
        }

        {!isFormValid && <View style={{marginBottom: 20}}><Text>{message} </Text></View>}
        <Button
            mode="contained"
            disabled={loading}
            uppercase={true}
            style={{backgroundColor:colors.button,margin:10}}
            onPress={handleAdd}
        >
         Stwórz {isVoting ? "głosowanie" : "ankietę"}
        </Button>
        {/* </form> */}
        </View>


        

        <Portal>
          <Dialog visible={votingDialogVisible} onDismiss={hideVotingDialog}>
            <Dialog.Title>Wybierz typ formularza</Dialog.Title>
          <Dialog.Content>
              <Divider/>
               <List.Item  onPress={()=>{onSurveyTypeChange(true)}} 
                bottomDivider
                title="Głosowanie"/>
               <List.Item  onPress={()=>{onSurveyTypeChange(false)}} 
                bottomDivider
                title="Ankieta"/>
          </Dialog.Content>
          </Dialog>
        </Portal>  

        <Portal>
            <Dialog visible={typeDialogVisible} onDismiss={hideDialog}>
              <Dialog.Title>Wybierz typ pytania</Dialog.Title>
                <Dialog.Content>
                    <Divider/>
                        {
                      questionTypes.map((type) => (
                        <List.Item  onPress={()=>onQuestionTypeChange(typeDialogNumber,type)} 
                        bottomDivider
                        key={type.type}
                        title={type.description}/>
                      ))}
                </Dialog.Content>
            </Dialog>
        </Portal>  

        {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="spinner"
          onChange={(d)=>onChangeDate(d)}
        />)}

        {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={(d)=>onChangeTime(d)}
        />)}
    </ScrollView>  
  );
}


export default  CreateSurvey;