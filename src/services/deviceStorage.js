import  AsyncStorage  from '@react-native-community/async-storage';
import authHeader from "./authHeader";
import { getHoasRoles } from './hoaService';
const deviceStorage = {
  async setItem(key, valueToSave) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(valueToSave));
           
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async getItem(key) {
    try {
      const val= await AsyncStorage.getItem(key);
      
      return JSON.parse(val);
     
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
    
  
    deviceStorage.setItem('id_token',jwt).then(
      ()=>{
        authHeader().then(()=>{
          getHoasRoles().then(()=>{
            this.setState({
              jwt: jwt
            });
          })
          
        });
       
      }
    );
  },


  async loadJWT() {
    try {
      deviceStorage.getItem('id_token').then(
        (value)=>{

         // console.log(JSON.parse( value));
          if (value !== null) {
        
            getHoasRoles().then(()=>{
              this.setState({
                //użytkownik zalogowany
                jwt: value,
                loading: false
              });
            })
            

          } else {
            this.setState({
              //użytkownik wylogowany
              loading: false
            });
          }
        }
      );
     
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
          });
          authHeader();
        }
      );
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
};

export default deviceStorage;