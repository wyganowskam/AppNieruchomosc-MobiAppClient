import React, { Component } from 'react';
import {
  LayoutAnimation,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import {  Text, Button,TextInput,Portal } from 'react-native-paper';
import {login} from '../../services/authService';
import colors from "../../config/colors"

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
     this.setState({ isLoading: true, message:'' });
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
    else{
      if (!emailValid) this.setState({message:"Nieprawidłowy adres email"});
      else this.setState({message:"Nieprawidłowe hasło"});
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
  
    return true;
  }

  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
  
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
   <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}>

  
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
         
            <TextInput
              
              value={email}
              onChangeText={(email) =>{ this.setState({ email });  if(this.state.message!=='') this.setState({message:''})}}
              placeholder="Email"
              editable={true}
              style={styles.inputStyle}

            />
          
            
            <TextInput
              value={password}
              onChangeText={(password) => {this.setState({ password }); if(this.state.message!=='') this.setState({message:''})}}
              placeholder="Hasło"
              secureTextEntry
              editable={true}
              style={styles.inputStyle}

            />
            <Text style={{color:colors.error, margin:5}}>{this.state.message}</Text>
           
          </View>
         
        </KeyboardAvoidingView>
        <View style={{alignItems:"center"}}>
        <View style={styles.buttonContainer}>
        <Button
            loading={isLoading}
            mode="contained"
            labelStyle={styles.LoginButtonText}
            onPress={this.loginHandler}
            disabled={isLoading}
            style={styles.LoginButton}
            
            
          >
            ZALOGUJ SIĘ
          </Button>
          </View>

          
        
          <View style={styles.loginHereContainer}>
          <Text style={styles.questionText}>
            Nie masz konta? 
          </Text>
          <Button
            mode="text"
            labelStyle={styles.TransparentButtonText}
            compact={true}
            uppercase={false}
            style={{color:"pink"}}
            onPress={this.handleRegisterButton}
          >
              Zarejestruj się
          </Button>
          
        </View>
        <View style={styles.loginHereContainer}>
        <Text style={styles.questionText}>
            Nie pamiętasz hasła? 
          </Text>
          <Button
           mode="text"
           labelStyle={styles.TransparentButtonText}
           compact={true}
           uppercase={false}
            onPress={this.handleResetButton}
          >
            Zresetuj hasło
          </Button>
        </View>

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
  LoginText: {
    color: colors.black,
    fontSize: 3,
    
  },
  background: {
    flex: 1,
    width: '100%',
  },
  LoginButton: {
    width: 250,
    borderRadius: 0,
   
    flex:1,
   
    backgroundColor:colors.button,
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
    borderColor: colors.grey,
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {height:50,
     width:250,
     alignSelf:"center",
     margin:5,
     backgroundColor:"transparent",
     fontSize:16
    
    },

  LoginButtonText: {
    alignSelf:"center",
    color:colors.white,
    fontSize: 16,
  },

  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width:250,
    marginBottom:25
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
