import React, { Component } from 'react'
import { Avatar, Card, Icon } from 'react-native-elements'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {getUserInfo} from '../../services/authService';
import deviceStorage from '../../services/deviceStorage'
 //import PhotoUpload from 'react-native-photo-upload';
 import {getHoasRoles} from '../../services/hoaService';
const backgroundImage = { uri: "https://s8.flog.pl/media/foto/7944472_miasto-noca.jpg"};
const avatar={uri: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"};


export default class Profile extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      usersurname:'',
      isAppAdmin: undefined,
      isBuildingAdmin: undefined,
      isBoard: undefined,
      isResident: undefined,
    };

    this.getInfo = this.getInfo.bind(this);
    this.getHoasRoles=getHoasRoles.bind(this);
    this.loadHoa=this.loadHoa.bind(this);
    
    this.loadHoa();
    this.getInfo();
  }

  getInfo() {
   
   
    getUserInfo().then(
      (res) => {
        console.log(res);
        if(res.status === 200){
        //udało się zdobyć informacje o użytkowniku
         this.setState({usersurname:res.data.surname, username:res.data.name});
         //zapisujemy dane w devicestorage
          
        }
      }
    );
  }

  loadHoa(){
    getHoasRoles().then(
      () => {
        
          deviceStorage.getItem("isAppAdmin")
            .then((val1)=>{ 
              
          deviceStorage.getItem("isBuildingAdmin")
            .then((val2)=>{ 
              
          deviceStorage.getItem("isBoard")
            .then((val3)=>{ 
              
          deviceStorage.getItem("isResident")
            .then((val4)=>{
              
              this.setState({
                isAppAdmin:val1==='true',
                isBuildingAdmin:val2==='true',
                isBoard:val3==='true',
                isResident:val4==='true'})
            });
            });
            });
            });
          
          
          
          
      }
    );
  
  }


  componentDidMount() {
   
   // console.log(this.state);
  }
  
  render() {
    const {
      username,
      usersurname
    } = this.state;
    
    return (
      <View>
      <View style={styles.headerContainer}>



      <Avatar size='xlarge' rounded  imageProps={{resizeMode:'cover'}} source={avatar}  activeOpacity={0.7}/>
      <Text style={styles.userNameText}>{username + ' ' + usersurname}</Text>
        </View>
   
    </View>

    )
  }
}

const styles = StyleSheet.create({
 
  headerContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
    paddingTop: 20,
  },
 
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})


