import React, { Component } from 'react';
import {
  LayoutAnimation,
  Dimensions,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import FormInput from '../FormInput';
import {forgotPassword} from './ResetPasswordActions';
// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      emailValid: true,
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    LayoutAnimation.easeInEaseOut();
    const emailValid = this.validateEmail();
    const {email} = this.state;
    if ( emailValid ) {
      this.setState({ isLoading: true });
      forgotPassword(email).then(
        (res) => {
          this.setState({message:res.message, isLoading:false});
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            this.setState({message:resMessage, isLoading:false});
        }
      );
    }
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

  
  

    handleResetButton = () => {
      this.props.navigation.navigate('Login');
    };


  render() {
    const {
      isLoading,
      email,
      emailValid,
    } = this.state;

    return (
      <View
        style={styles.container}       
      >
        <KeyboardAvoidingView
          behavior="padding"
          contentContainerStyle={styles.formContainer}
        >
        
          <View style={{ width: SCREEN_WIDTH*0.8, alignItems: 'center' }}>
         
            <FormInput
              refInput={(input) => (this.emailInput = input)}
              icon="mail"
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
                this.reset();
              }}
            />
            <Text style={{color:'red'}}>{this.state.message}</Text>
            <Button
              loading={isLoading}
              title="Zresetuj hasło"
              containerStyle={{ flex: -1 }}
              
              titleStyle={styles.LoginButtonText}
              onPress={this.reset}
              disabled={isLoading}
              buttonStyle={styles.LoginButton}            
            />    
          </View>
         
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 50,
    paddingTop: 0,
    backgroundColor: 'white',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  LoginText: {
    color: 'white',
    fontSize: 28,
    
  },
  whoAreYouText: {
    color: '#7384B4',
    
    fontSize: 14,
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
  
 
  LoginButtonText: {
    
    fontSize: 13,
  },
  LoginButton: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 45,
    alignSelf:'center',
    backgroundColor:'gray'
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    
    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
   
    fontSize: 12,
  },
});
