import React, { Component } from 'react';
import {
  LayoutAnimation,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image
} from 'react-native';
import {  Text, Button } from 'react-native-paper';
import FormInput from '../../components/common/FormInput';
import colors from "../../config/colors"
import {forgotPassword} from '../../services/authService';



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class ResetPasswordScreen extends Component {
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
                this.reset();
              }}
            />
            <Text style={{color:colors.error}}>{this.state.message}</Text>
            <Button
              loading={isLoading}
              title="ZRESETUJ HASŁO"
              labelStyle={styles.ResetButtonText}
              onPress={this.reset}
              mode="contained"
              disabled={isLoading}
              style={styles.ResetButton}            
            >
              ZRESETUJ HASŁO
              </Button> 
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
  ResetButtonText: {
    
    fontSize: 13,
  },
  ResetButton: {
    width: 250,
    borderRadius: 0,
    height: 45,
    flex:1,
    alignContent:"center",
    alignSelf:'center',
    backgroundColor:colors.button
  },
});
