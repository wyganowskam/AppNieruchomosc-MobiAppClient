import React, { Component } from 'react';
import {
  LayoutAnimation,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  
} from 'react-native';
import {  Text, Button,TextInput } from 'react-native-paper';
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
    else {
      this.setState({message:"Niepoprawny email", isLoading:false});
    }
  }

  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
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
              onChangeText={(email) => {this.setState({ email }); if(this.state.message!=='') this.setState({message:''})}}
              placeholder="Email"
              editable={true}
              style={styles.inputStyle}
             
            />
            <Text style={{color:colors.error}}>{this.state.message}</Text>
            <View style={styles.buttonContainer}>
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
          </View>
         
        </KeyboardAvoidingView>
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
   
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.grey,
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    height:50,
     width:250,
     alignSelf:"center",
     margin:5,
     backgroundColor:"transparent",
     fontSize:16
    
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width:250,
      marginBottom:25
    },
  ResetButtonText: {
    
    fontSize: 13,
  },
  ResetButton: {
    width: 250,
    borderRadius: 0,
   
    flex:1,
   
    backgroundColor:colors.button,
  },
});
