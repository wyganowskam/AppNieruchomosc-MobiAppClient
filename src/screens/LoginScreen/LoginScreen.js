import React, { Component } from 'react';
import {
  LayoutAnimation,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import FormInput from '../../components/common/FormInput';
import {login} from '../../services/authService';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      emailValid: true,
      message: '',
      passwordValid: true,
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  loginHandler() {
    LayoutAnimation.easeInEaseOut();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    const { email,password } = this.state;
    if (
      emailValid &&
      passwordValid
    ) {
     this.setState({ isLoading: true });
     login(email,password).then(result =>{
       this.props.route.params.newJWT(result.data.token);
     },
     (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.setState({isLoading:false,message:resMessage});
      //this.clearForm();
       });
    }
  }

  clearForm(){
    this.setState({email:'', password:''});
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

  

    handleRegisterButton = () => {
      this.props.navigation.navigate('Register');
    };

    handleResetButton = () => {
      this.props.navigation.navigate('Reset');
    };


  render() {
    const {
      isLoading,
      email,
      emailValid,
      password,
      passwordValid,
    } = this.state;

    return (
      <ImageBackground
    //source={require('../../assets/background_dot.png')}
    resizeMode="repeat"
    style={styles.background}
  >
  <View
        style={styles.container}       
      >
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
                passwordValid ? null : 'Nieprawidłowe hasło'
              }
              onSubmitEditing={() => {
                this.validatePassword();
                this.loginHandler();
              }}
            />
            <Text style={{color:'red'}}>{this.state.message}</Text>
            <Button
            loading={isLoading}
            title="ZALOGUJ SIĘ"
            containerStyle={{ flex: -1 }}
            raised
            titleStyle={styles.LoginButtonText}
            onPress={this.loginHandler}
            disabled={isLoading}
            buttonStyle={styles.LoginButton}
            
          />
          
          </View>
         
        </KeyboardAvoidingView>
        <View style={{alignItems:"center"}}>
        <View style={styles.loginHereContainer}>
          <Text style={styles.questionText}>
            Nie masz konta? 
          </Text>
          <Button
            title="Zarejestruj się"
            titleStyle={styles.TransparentButtonText}
            containerStyle={{ flex: -1 }}
            buttonStyle={{ backgroundColor: 'transparent' }}
            underlayColor="transparent"
            onPress={this.handleRegisterButton}
          />
          
        </View>
        <View style={styles.loginHereContainer}>
        <Text style={styles.questionText}>
            Nie pamiętasz hasła? 
          </Text>
          <Button
            title="Zresetuj hasło"
            titleStyle={styles.TransparentButtonText}
            containerStyle={{ flex: -1 }}
            buttonStyle={{ backgroundColor: 'transparent' }}
            underlayColor="transparent"
            onPress={this.handleResetButton}
          />
        </View>

        </View>
      </View>
  </ImageBackground>
      
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
  LoginText: {
    color: 'black',
    fontSize: 28,
    
  },
  background: {
    flex: 1,
    width: '100%',
  },
  LoginButton: {
    width: 250,
    borderRadius: 0,
    height: 45,
    alignSelf:'center',
    backgroundColor:'#725174'
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
  },
  
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'gray',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  LoginButtonText: {
    
    fontSize: 13,
  },

  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionText: {
    
    fontSize: 12,
    color: 'gray',
  },
  TransparentButtonText: {
    color: 'black',
   
    fontSize: 12,
  },
});
