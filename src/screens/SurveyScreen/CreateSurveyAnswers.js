import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';

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
    <div>

        <div>
          <Typography style={{float:"left", marginTop:10, marginRight: 10}}>
            Odpowiedzi</Typography>
        <Button style={{float:"left"}} onClick={onMinusClick}>
          <RemoveIcon />
        </Button>
        <Button style={{float:"left"}} onClick={onPlusClick}>
          <AddIcon />
        </Button>
          </div>    
        <div style={{clear:'left'}} />
        {[...Array(answersCount)].map((e, i) => 
        <div key={i} id="answers-div">
          
          <TextField
            margin="normal"
            color="secondary"
            required
            fullWidth
            id="title"
            label="Etykieta"
            name="title"
            style={{width:'19%', marginRight: '2%'}}
            onChange={e => onQuestionAnswerLabelChange(questionNumber, i, e.target.value)}
        />
                  
                  <TextField
            margin="normal"
            color="secondary"
            required
            fullWidth
            id="title"
            label="Treść odpowiedzi"
            name="title"
            style={{width:'79%'}}
            onChange={e => onQuestionAnswerTextChange(questionNumber, i, e.target.value)}
        />
        {/* {i !== answersCount-1 && <Divider style={{marginTop:15}} /> } */}
        </div>)}

    </div>
  );
}