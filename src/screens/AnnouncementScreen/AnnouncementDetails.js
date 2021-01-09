import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    root:{
        padding: 15,
        textAlign: 'left',
        wordWrap: 'break-word'
    },
    title:{
        color: '#555555',
        marginBottom: 50
    },
    dateButton:{
        backgroundColor: '#dddddd',
        textTransform: "none",
        '&:disabled': {
            color: "#000000",
         },
         padding: 10,
         borderRadius:8,
         marginTop: 30
    },
    divider:{
        marginTop: 20,
        marginBottom:10
    }
  }));

const AnnouncementDetails = (props) => {

    const classes = useStyles();
    const ann = props.announcement;

    return (
      <Paper elevation={2} square className={classes.root}>
          <div>
          <Typography variant="h6" gutterBottom>
          <b>{ann.title}</b>
          </Typography>

        <Typography variant="body2" gutterBottom   style={{whiteSpace: 'pre-line'}}
>
        {ann.longText}
        <br></br>

        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2" gutterBottom>
        Utworzono&nbsp;<b>{ann.created}</b>
        </Typography>
        </div>
      </Paper>
    )
}

export default AnnouncementDetails;