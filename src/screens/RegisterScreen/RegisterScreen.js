import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import {  Text, Button } from 'react-native-paper';
import FormInput from '../../components/common/FormInput';
import {register} from '../../services/authService';
import {RegisterSuccess} from './RegisterSuccess';
import colors from "../../config/colors"

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
    const usernameValid = this.validateUsername();
    const usersurnameValid=this.validateUsersurname();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    const confirmationPasswordValid = this.validateConfirmationPassword();
    const {email,usersurname,username,password}=this.state;
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
        password: password
    }).then(
      (res) => {

        if(res.status === 200){
         this.setState({success:true, message:res.message});
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
  }

  validateUsername() {
    const { username } = this.state;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usernameValid });
    usernameValid || this.usernameInput.shake();
    return usernameValid;
  }

  validateUsersurname() {
    const { usersurname } = this.state;
    const usersurnameValid = usersurname.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usersurnameValid });
    usersurnameValid || this.usersurnameInput.shake();
    return usersurnameValid;
  }

  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid;
  }

 
  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  }

  validateConfirmationPassword() {
    const { password, confirmationPassword } = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({ confirmationPasswordValid });
    confirmationPasswordValid || this.confirmationPasswordInput.shake();
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
            <FormInput
              refInput={(input) => (this.usernameInput = input)}
              value={username}
              onChangeText={(username) => this.setState({ username })}
              placeholder="Imię"
              returnKeyType="next"
              errorMessage={
                usernameValid ? null : "Imię nie może być puste"
              }
              onSubmitEditing={() => {
                this.validateUsername();
                this.usersurnameInput.focus();
              }}
            />
              <FormInput
              refInput={(input) => (this.usersurnameInput = input)}
              value={usersurname}
              onChangeText={(usersurname) => this.setState({ usersurname })}
              placeholder="Nazwisko"
              returnKeyType="next"
              errorMessage={
                usersurnameValid ? null : "Nazwisko nie może być puste"
              }
              onSubmitEditing={() => {
                this.validateUsersurname();
                this.emailInput.focus();
              }}
            />
            <FormInput
              refInput={(input) => (this.emailInput = input)}
              value={email}
              onChangeText={(email) => this.setState({ email })}
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              errorMessage={
                emailValid ? null : 'Nieprawidłowy adres email'
              }
              onSubmitEditing={() => {
                this.validateEmail();
                this.passwordInput.focus();
              }}
            />
             
            <FormInput
              refInput={(input) => (this.passwordInput = input)}
              value={password}
              onChangeText={(password) => this.setState({ password })}
              placeholder="Hasło"
              secureTextEntry
              returnKeyType="next"
              errorMessage={
                passwordValid ? null : 'Hasło musi mieć przynajmniej 8 znaków'
              }
              onSubmitEditing={() => {
                this.validatePassword();
                this.confirmationPasswordInput.focus();
              }}
            />
            <FormInput
              refInput={(input) => (this.confirmationPasswordInput = input)}
              value={confirmationPassword}
              onChangeText={(confirmationPassword) =>
                this.setState({ confirmationPassword })
              }
              placeholder="Powtórz hasło"
              secureTextEntry
              errorMessage={
                confirmationPasswordValid
                  ? null
                  : 'Hasła różnią się od siebie'
              }
              returnKeyType="go"
              onSubmitEditing={() => {
                this.validateConfirmationPassword();
                this.signup();
              }}
            />

            <Text style={{color:colors.error}}>{this.state.message}</Text>
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
         
        </KeyboardAvoidingView>
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
    backgroundColor:colors.light
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
 
  signUpButtonText: {
    
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: 0,
    height: 45,
    flex:1,
    alignContent:"center",
    alignSelf:'center',
    backgroundColor:colors.button
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    
    fontSize: 12,
    color: colors.grey,
  },
  TransparentButtonText: {
    color: 'black',
   
    fontSize: 12,
  },
});
