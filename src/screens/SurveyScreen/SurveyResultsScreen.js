import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import surveyService from '../../services/survey.service';
import { Alert } from "@material-ui/lab";
import { Divider } from "@material-ui/core";


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
    <div>
      {canSeeResults === false &&
      <Alert style={{marginBottom:15, maxWidth:900}} severity="info">
          Nie posiadasz uprawnień do wyświetlenia wyników. Wyniki będą dostępne dla wszystkich członków wspólnoty po upływie terminu przyjmowania odpowiedzi.
      </Alert>
      }

      {canSeeResults && 
        <div style={{maxWidth:800, textAlign:'left', color:'#444'}}>
          
          <Typography variant="body1" style={{marginBottom:25}}>
            <strong>{survey.title}</strong>
          </Typography>

          {survey.questions.map((q, i) => (
              <Box key={i} border={2} 
              style={{padding: 20 , marginBottom: 30, borderRadius:3, borderColor: '#ddd', maxHeight:500, overflowY:'auto'}}>

            <Typography variant="body1" style={{marginBottom:20}}>
            <strong>{survey.questions[i].questionText}</strong>
            </Typography>

            {q.predefinedAnswers?.map((ans, i) => (
              <Typography key={i} variant="body2" style={{marginBottom:20}}>
              <strong>{ans.label}:</strong>&nbsp;{ans.answerText}
              </Typography>
            ))}
            <Divider style={{marginTop:20, marginBottom:20}} />
            {q.predefinedAnswers?.map((ans, j) => (
              <Typography key={j} variant="body2" style={{marginBottom:20}}>
              <strong>{ans.label}:</strong>&nbsp;
              {questionResults[i]?.answersResults?.find(a=>a.label===ans.label)?.votes??0}&nbsp;głosów
              {q.typeKey === 'SingleChoice' && `(${questionResults[i]?.answersResults?.find(a=>a.label===ans.label)?.votesPercent??0}%)`}
              </Typography>
            ))}

            {questionResults[i].openAnswers?.filter(ans => ans.length > 0)?.map((text, i) => (
              <div key={i} >
              <Typography variant="body2" style={{marginBottom:10}}>
                {text}
              </Typography>
              <Divider />
              </div>
            ))}
              
            </Box>
          ))}

        </div>
      }

    </div>
  );
}