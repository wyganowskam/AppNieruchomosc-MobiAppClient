import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {acceptInvitation} from '../../services/invitationService';
import CircularProgress from '@material-ui/core/CircularProgress';
export const primaryCyanLight = '#00bcd4';
const useStyles = makeStyles((theme) => ({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.grey[800],
    },
    buttonProgress: {
        color: primaryCyanLight,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -13,
        marginLeft: -13,
      },
  })) ;

  
function LoadingCircle() {
    const classes = useStyles();
  
    return (
        <CircularProgress size={26} className={classes.buttonProgress} />
    );
  }


export default function Row(props) {
  const row = props.row;
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    setLoading(true);
    acceptInvitation({
      invitationId: row.id
    }).then(
      (res) => {
        if(res.status === 200) setReload(reloadOld => !reloadOld);
        this.props.navigation.goBack();
      },
      (error) => {
       
        const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log(resMessage);
      
      }
    ).catch(e => { setLoading(false); });
    setLoading(false);
  };

  return (

      <Paper elevation={3} style={{padding:20, margin:20, maxWidth: 800, textAlign: 'left'}}>
       <Button disabled={loading} onClick={handleSave} style={{backgroundColor: '#EEEEEE', padding:7, 
       borderRadius:10, marginRight: 50}} >  
            
            {loading && <LoadingCircle />}
            Akceptuj  
            </Button >
            {row.hoaName}
        </Paper>

  );
}