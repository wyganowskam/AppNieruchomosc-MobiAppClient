import  AsyncStorage  from '@react-native-community/async-storage';
import { setAuthHeader } from "../api/ApiClient";
const deviceStorage = {
  async setItem(key, valueToSave) {
    try {
      await AsyncStorage.setItem(key, valueToSave);
           
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async getItem(key) {
    try {
      const val= await AsyncStorage.getItem(key);
      
      return val;
     
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
     
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async getJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
    return value;
    
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async saveJWT(value){
    this.setItem('id_token',value);
  },

  newJWT(jwt){
    this.setState({
      jwt: jwt
    });
    setAuthHeader(jwt);
    deviceStorage.setItem('id_token',jwt);
  },


  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      if (value !== null) {
        this.setState({
          //użytkownik zalogowany
          jwt: value,
          loading: false
        });
      } else {
        this.setState({
          //użytkownik wylogowany
          loading: false
        });
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async deleteJWT() {
    try{
      await AsyncStorage.removeItem('id_token')
      .then(
        () => {
          this.setState({
            jwt: ''
          })
        }
      );
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
};

export default deviceStorage;