import React, { useState, useEffect } from 'react'
import announcementService from '../../services/announcement.service'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import useStylesForm from '../../styles/formStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ErrorAlert from '../../components/ErrorAlert';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    root:{
        textAlign: 'left',
        maxHeight: 1000
    },
    addCommentButton: {
      marginTop:10
    },
    authorName:{
      float:'left',
      marginLeft: 10
    },
    avatar:{
      float:'left',
      marginLeft: 0,
      backgroundColor: '#c1f5e3',
      color: '#777777',
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    paper:{
      padding:"5px 10px 5px 10px",
      marginTop:20,
      marginRight: 20,
      minWidth: 200,
      maxWidth: 600,
      wordWrap: 'break-word'

    },
    chip:{
      backgroundColor: '#888888',
      color: '#ffffff',
      float:'left',
      marginLeft: 10,
      padding: 0
    },
    authorButton:{
      textTransform: "none",
      '&:disabled': {
        backgroundColor: '#dfdfd',
        color: '#000000'
       },
       borderRadius: 10,
       paddingTop:10
    }
  }));

const Comments = (props) => {

    const classes = useStyles();
    const classesForm = useStylesForm();
    const announcementId = props.announcementId;
    const [allowComments, setAllowComments] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [comments, setComments] = useState([]);
    const [isFormValid, setIsFormValid] = useState(true);
    const [message, setMessage] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [goToLastPage, setGoToLastPage] = useState(false);
    const [forceReload, setForceReload] = useState(false);

    console.log(allowComments);

    useEffect(() => {
      announcementService.getCommentPagesCount(announcementId).then(
          res => {
              setTotalPages(res.data);
              if(goToLastPage){
                if(page === res.data){
                  setForceReload(old => !old);
                }
                setPage(res.data);
                setGoToLastPage(false);
              }
          },
          (error) => {
            
          }
        ).catch(e => { });
  }, [page, announcementId, goToLastPage]);


    useEffect(() => {
        announcementService.getComments(announcementId, page).then(
            res => {     
              setComments(res.data);     
            },
            (error) => {
              
            }
          ).catch(e => { });
    }, [announcementId, page, forceReload]);

    const onChangeText = e => {
      const val = e.target.value;
      setText(val);
    };

    const validate = () => {
      if(!text){
          setMessage("Komentarz jest pusty");
          setIsFormValid(false);
          return false;
      }
      else if(text.length < 3){
          setMessage("Komentarz musi mieć co najmniej 3 znaki");
          setIsFormValid(false);
          return false;
      }
      else{
          setIsFormValid(true);
          return true;
      }
  
    }
  
    const handleAdd = (e) => {
      e.preventDefault();
      setMessage("");
      let isValid = validate();
  
      if(isValid === true){
        setLoading(true);
        announcementService.createComment({
            announcementId: announcementId,
            text: text,
        }).then(
          () => {
            setGoToLastPage(true);
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
      }
      setLoading(false);
    };
    
    const onPageChange = (e, pageNr) => {
      console.log(pageNr);
      setPage(pageNr);
  }


    return (
      <div className={classes.root}>

    <Typography variant="h6" gutterBottom>
        Komentarze
    </Typography>
    <FormControlLabel
        control={<Switch 
          checked={allowComments} 
          onChange={(e) => setAllowComments(e.target.checked)} 
          name="checkedA" 
          inputProps={{ 'aria-label': 'primary checkbox' }}/>}
        label="Pozwalaj na komentowanie"

      />
          <Pagination page={page} siblingCount={0} count={totalPages} style={{marginTop:20, marginBottom:20}} 
    onChange={onPageChange}/>
      {comments.map((comment, index) => (
          <Paper key={comment.id} className={classes.paper} elevation={3} 
            
            >
            <Button className={classes.authorButton} disabled={true}>
        <Avatar className={classes.avatar} style={{marginTop:-5}} fontSize="small">
        <Typography style={{marginTop:5}} variant="subtitle2" gutterBottom>
          {comment.authorName.charAt(0).toUpperCase()}
          {comment.authorSurname.charAt(0).toUpperCase()}
          </Typography>
        </Avatar>
        <Typography className={classes.authorName} variant="subtitle2" gutterBottom>
        {comment.authorName}&nbsp;
          {comment.authorSurname}
        </Typography>
        {comment.isAuthorBoardMember && <Chip size="small" className={classes.chip} label="Zarząd" /> }
        {comment.isAuthorAdministrator && <Chip size="small" className={classes.chip} label="Administrator" /> }
        </Button>
        <div style={{clear:'left'}} />
        <Divider />
        <Typography variant="subtitle2" style={{marginTop:5}} >
          {comment.text}
        </Typography>
        <Typography variant="caption" gutterBotto style={{color:'#777777  '}}>
        {comment.created}
        </Typography>
        </Paper>
      ))}

  {allowComments ? 
    <form className={classesForm.form} noValidate onSubmit={handleAdd}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline            
            rows={2}
            id="text"
            label="Komentarz"
            name="text"
            className={classesForm.outlineInput}
            onChange={onChangeText}
        />
        {!isFormValid && <ErrorAlert message={message}/>}
        <Button
            type="submit"            
            style={{ backgroundColor: '#666666', color: '#ffffff'}}
            variant="contained"
            disabled={loading}
            className={classes.addCommentButton}
        >
        Dodaj komentarz
        </Button >
        </form>
        : <p>Możliwość komentowania posta jest wyłączona.</p>}
      </div>
    )
}

export default Comments;