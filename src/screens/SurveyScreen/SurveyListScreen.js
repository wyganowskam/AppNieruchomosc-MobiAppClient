import React, { useState, useEffect } from 'react'
import surveyService from '../../services/survey.service';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Pagination from '@material-ui/lab/Pagination';
import { Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
    root:{
    },
    paper:{
        padding:'10px 15px 5px 15px', 
        margin:'20px 10px 20px 10px', 
        textAlign: 'left',
        boxShadow: "2px 3px 12px -5px #cc9999",
    },
    divider: {
      marginTop:20,
      marginBottom:10,
      backgroundColor: "#f2acac"
    },
    button: {
        padding: 10,
        backgroundColor: '#ffffff',
        '&:hover': {
          background: "#c1f5e3",
       },
       marginTop: 15
    },
    buttonAdd: {
        padding: 10,
       float: 'left',
       marginTop: 15,
       marginLeft:20,
       marginRight:20
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
    navigateIcon:{
        color: "#888888",
        float:"left"
    }
  }));

export default function Surveys(props) {

    const [page, setPage] = useState(1);
    const [surveys, setSurveys] = useState([]);
    const classes = useStyles();
    const [isNewPage, setIsNewPage] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    //const {isAppAdmin, isBuildingAdmin, isBoard} = props.permissions;
    //const {setLinearLoading} = props;
    //const canCreateSurvey = isAppAdmin || isBuildingAdmin || isBoard;

    useEffect(() => {
        surveyService.getTotalPages().then(
            res => {
                setTotalPages(res.data);       
            },
            (error) => {
              
            }
          ).catch(e => { });
    }, []);

    useEffect(() => {
        surveyService.getSurveys(page).then(
            res => {
                    setIsNewPage(false);
                    setSurveys(res.data);
                    setIsNewPage(true);       
            },
            (error) => {
            }
          ).catch(e => {  });
    }, [page]);


    const onPageChange = (e, pageNr) => {
        console.log(pageNr);
        setPage(pageNr);
    }

    const onAnnouncementClick = (id) => {
      props.navigation.push('SurveyDetails',{surveyId:id})
    }

    return (
      <div className={classes.root}>
          <div style={{height: 35}}>
         <Fab   size="small"
                onClick={() =>{props.navigation.push('SurveyAdd')}}  
                style={{
                  position: 'absolute',
                  margin: 15,
                  right: 0,
                  top: 0,
                  backgroundColor: '#aaa'
              }}
                >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M22 5v2h-3v3h-2V7h-3V5h3V2h2v3h3zm-3 14H5V5h6V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6h-2v6zm-4-6v4h2v-4h-2zm-4 4h2V9h-2v8zm-2 0v-6H7v6h2z"/></svg> 

                </Fab>


          <Pagination count={totalPages} style={{float: 'left',marginTop:20, marginBottom:20}}
          page={page} onChange={onPageChange}/>


          </div>
          <Divider style={{clear:'left', paddingTop:2}} />
         {surveys.map((ann, index) => (
             <Grow in={isNewPage} key={ann.id}
             style={{ transformOrigin: '0 0 0 0' }}
             {...(isNewPage ? { timeout: 300 * (index + 1) } : {})}>
                             <Paper onClick={(e) => onAnnouncementClick(ann.id)} square key={ann.id} elevation={2} className={classes.paper}
                             >
                            
             <Grid container spacing={2}>
                <Grid item xs={12}> 
                <Grid container spacing={2}>
                <Grid item xs={12} style={{wordWrap: 'break-word'}}>
                  <Typography variant="body1" style={{color:'#444444', marginTop:10, marginBottom:20}}>
                  <svg style = {{float:'left', marginRight:10, marginTop:-5}} xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="30">
                    <path d="M0 0h24v24H0z" fill="none"/><path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                  <strong>{ann.title}</strong>

                  </Typography>
                </Grid>

                </Grid>
                
                <Typography variant= "body2">
                {ann.description}

                </Typography>
                <Divider className={classes.divider}/>
                <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs={6}>  
                <Typography variant="body2">
                  Utworzono:&nbsp;{ann.created}
                </Typography>
                </Grid>
                <Grid item xs={6} style={{textAlign: 'right'}}>
                <Typography variant="body2">
                  {ann.acceptAnswers ? "Przyjmuje odpowiedzi" : "Ankieta zakończona"}
                </Typography>
                </Grid>
                </Grid>
                </Grid>
             </Grid>
             </Paper>
             </Grow>

          ))}

      </div>
    )
}