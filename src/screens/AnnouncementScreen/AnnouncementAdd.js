import React, { useState } from 'react'
import announcementService from '../../services/announcement.service'
import { makeStyles } from '@material-ui/core/styles';
import useStylesForm from '../../styles/formStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ErrorAlert from '../../components/ErrorAlert';

const useStyles = makeStyles((theme) => ({
    root:{
      margin: 20
    },
    addButton: {
      marginTop:10,
      minWidth:300
    }
  }));

const Comments = (props) => {

    const classes = useStyles();
    const classesForm = useStylesForm();
    const [isFormValid, setIsFormValid] = useState(true);
    const [message, setMessage] = useState("");
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangeText = e => {
      const val = e.target.value;
      setText(val);
    };

    const onChangeTitle = e => {
        const val = e.target.value;
        setTitle(val);
      };

    const validate = () => {
      if(!text || !title){
          setMessage("Wypełnij wszystkie wymagane pola");
          setIsFormValid(false);
          return false;
      }
      else if(text.length < 10){
          setMessage("Treść ogłoszenia musi mieć co najmniej 10 znakow");
          setIsFormValid(false);
          return false;
      }
      else if(title.length < 10){
        setMessage("Tytuł ogłoszenia musi mieć co najmniej 10 znakow");
        setIsFormValid(false);
        return false;
    }
    else if(text.length > 4000){
        setMessage("Treść ogłoszenia może mieć maksymalnie 4000 znaków");
        setIsFormValid(false);
        return false;
    }
    else if(title.length > 100){
      setMessage("Tytuł ogłoszenia może mieć maksymalnie 100 znakow");
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
        announcementService.createAnnouncement({
            title: title,
            text: text,
        }).then(
          () => {
            props.navigation.push('Announcements');
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setIsFormValid(false);
            setMessage(resMessage);
  
          }
        );
      }
      setLoading(false);
    };
    

    return (
      <div className={classes.root}>
    <form className={classesForm.form} noValidate onSubmit={handleAdd}>
    <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Tytuł"
            name="title"
            className={classesForm.outlineInput}
            onChange={onChangeTitle}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline            
            rows={20}
            id="text"
            label="Treść"
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
            className={classes.addButton}
        >
        Dodaj ogłoszenie
        </Button >
        </form>
      </div>
    )
}

export default Comments;