import  AsyncStorage  from '@react-native-community/async-storage';
import { setAuthHeader } from "../api/ApiClient";
const deviceStorage = {
  async saveItem(key, valueToSave) {
    try {
      await AsyncStorage.setItem(key, valueToSave);
     
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async getItem(key, valueToGet) {
    try {
      await AsyncStorage.getItem(key, valueToGet);
     
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async removeItem(key, valueToRemove) {
    try {
      await AsyncStorage.removeItem(key, valueToRemove);
     
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
    this.saveItem('id_token',value);
  },

  newJWT(jwt){
    this.setState({
      jwt: jwt
    });
    setAuthHeader(jwt);
    deviceStorage.saveItem('id_token',jwt);
  },


  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      if (value !== null) {
        this.setState({
          jwt: value,
          loading: false
        });
      } else {
        this.setState({
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