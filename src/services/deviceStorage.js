import  AsyncStorage  from '@react-native-community/async-storage';
import { setAuthHeader } from "../api/ApiClient";
const deviceStorage = {
  async saveKey(key, valueToSave) {
    try {
      await AsyncStorage.setItem(key, valueToSave);
     
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async printJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
     console.log(value);
    
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  newJWT(jwt){
    this.setState({
      jwt: jwt
    });
    setAuthHeader(jwt);
    deviceStorage.saveKey('id_token',jwt);
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