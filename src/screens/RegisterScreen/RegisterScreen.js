import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  ScrollView,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  
} from 'react-native';
import {  Text, Button ,TextInput} from 'react-native-paper';
import {register} from '../../services/authService';
//import {RegisterSuccess} from './RegisterSuccess';
import colors from "../../config/colors"
import { isEmail } from "validator";

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success:false,
      isLoading: false,
      selectedType: null,
      username: '',
      usersurname:'',
      email: '',
      password: '',
      confirmationPassword: '',
      emailValid: true,
      passwordValid: true,
      usernameValid: true,
      usersurnameValid:true,
      confirmationPasswordValid: true,
    };

   
    this.validateEmail = this.validateEmail.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validateUsersurname = this.validateUsersurname.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirmationPassword = this.validateConfirmationPassword.bind(
      this
    );
    this.signup = this.signup.bind(this);
    this.clearForm=this.clearForm.bind(this);
  }

  signup() {
    LayoutAnimation.easeInEaseOut();
    const {email,usersurname,username,password,confirmationPassword}=this.state;
    const usernameValid = this.validateUsername();
    const usersurnameValid=this.validateUsersurname();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    const confirmationPasswordValid = this.validateConfirmationPassword();
    console.log(emailValid)
    if (
      emailValid &&
      passwordValid &&
      confirmationPasswordValid &&
      usersurnameValid &&
      usernameValid
    ) {
      this.setState({ isLoading: true });
      register({
        userId: email,
        name: username,
        surname: usersurname,
        password: password,
        confirmPassword: confirmationPassword
    }).then(
      (res) => {

        if(res.status === 200){
         this.setState({success:true, message:"Rejestracja zakończona pomyślnie."});
       
        }
        else{
          
          this.setState({message:res.message});
        }
        this.clearForm();
        this.setState({isLoading:false});
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({isLoading:false,message:resMessage});
        this.clearForm();

      }
    );
    }
    else {
      if(!emailValid) this.setState({message:"Nieprawidłowy adres email"});
      else if(!passwordValid) this.setState({message:"Nieprawidłowe hasło. Hasło musi mieć przynajmniej 8 znaków."});
      else if(!confirmationPasswordValid) this.setState({message:"Hasła różnią się od siebie."});
      else if(!usernameValid) this.setState({message:"Imię nie może być puste."});
      else this.setState({message:"Nazwisko nie może być puste."});
      
    }
  }

  validateUsername() {
    const { username } = this.state;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usernameValid });
    return usernameValid;
  }

  validateUsersurname() {
    const { usersurname } = this.state;
    const usersurnameValid = usersurname.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usersurnameValid });
    return usersurnameValid;
  }

  validateEmail() {
    const { email } = this.state;
    const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    return emailValid;
  }

 
  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    return passwordValid;
  }

  validateConfirmationPassword() {
    const { password, confirmationPassword } = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({ confirmationPasswordValid });
    return confirmationPasswordValid;
  }

  clearForm(){
    this.setState({email:'', password:'',confirmationPassword:'',username:'',usersurname:''});
  }

 

  render() {
    const {
      isLoading,
      confirmationPassword,
      email,
      emailValid,
      password,
      passwordValid,
      confirmationPasswordValid,
      username,
      usernameValid,
      usersurname,
      usersurnameValid,
    } = this.state;
 
    return (
      <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}>
      <View style={styles.container} >
       
        <KeyboardAvoidingView
          behavior="padding"
          contentContainerStyle={styles.formContainer}
        >
        
          <View style={{ width: SCREEN_WIDTH*0.8, alignItems: 'center' }}>

          <Image
            style={styles.logo}
            source={require('../../assets/cover.png')}
          />
            <TextInput
          
              value={username}
              onChangeText={(username) =>{ this.setState({ username });if(this.state.message!=='') this.setState({message:''})}}
              placeholder="Imię"
              editable={true}
              style={styles.inputStyle}
            
            />
              <TextInput
              value={usersurname}
              onChangeText={(usersurname) =>{ this.setState({ usersurname });if(this.state.message!=='') this.setState({message:''})}}
              placeholder="Nazwisko"
              editable={true}
              style={styles.inputStyle}
            />
           <TextInput
              value={email}
              onChangeText={(email) => {this.setState({ email });if(this.state.message!=='') this.setState({message:''})}}
              placeholder="Email"
              editable={true}
              style={styles.inputStyle}
            />
             
             <TextInput
              value={password}
              onChangeText={(password) => {this.setState({ password });;if(this.state.message!=='') this.setState({message:''})}}
              placeholder="Hasło"
              secureTextEntry
              editable={true}
              style={styles.inputStyle}
            />
           <TextInput
              value={confirmationPassword}
              onChangeText={(confirmationPassword) =>
                {this.setState({ confirmationPassword });if(this.state.message!=='') this.setState({message:''})}
              }
              placeholder="Powtórz hasło"
              secureTextEntry
              editable={true}
              style={styles.inputStyle}
            />

            <Text style={{color:colors.error}}>{this.state.message}</Text>
            
          </View>
         
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
            <Button
              loading={isLoading}
              mode="contained"
              style={styles.signUpButton}
              labelStyle={styles.signUpButtonText}
              onPress={this.signup}
              disabled={isLoading}>
                  ZAREJESTRUJ SIĘ
              </Button>
              </View>
        <View style={styles.loginHereContainer}>
          <Text style={styles.alreadyAccountText}>
            Masz już konto? 
          </Text>
          <Button
             mode="text"
             labelStyle={styles.TransparentButtonText}
             compact={true}
             uppercase={false}
            onPress={() => {this.props.navigation.navigate('Login');}}
          >
              Zaloguj się tutaj
          </Button>
        </View>
       
        
      </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 50,
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor:colors.beige
  },
  logo: {
    width: 200,
    height:200
    },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    color: colors.black,
    fontSize: 28,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width:250,
    marginBottom:25
  },
 
  signUpButtonText: {
    alignSelf:"center",
    color:colors.white,
    fontSize: 16,
  },
  signUpButton: {
    width: 250,
    borderRadius: 0,
   
    flex:1,
   
    backgroundColor:colors.button,
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    
    fontSize: 14,
    color: colors.grey,
  },
  TransparentButtonText: {
    color: 'black',
   
    fontSize: 14,
  },
  inputStyle: {
    height:50,
     width:250,
     alignSelf:"center",
     margin:5,
     backgroundColor:"transparent",
     fontSize:16
    
    },
});
