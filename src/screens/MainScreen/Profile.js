import React, { Component } from 'react'
import { Avatar, Card, Icon } from 'react-native-elements'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {getUserInfo} from './MenuActions'
const backgroundImage = { uri: "https://s8.flog.pl/media/foto/7944472_miasto-noca.jpg"};
const avatar={uri: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"};


export default class Profile extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
     username:'',
     usersurname:'',
    };

    this.getInfo = this.getInfo.bind(this);
    this.getInfo();
  }

  getInfo() {
   
   
    getUserInfo().then(
      (res) => {
        console.log(res);
        if(res.status === 200){
         this.setState({usersurname:res.surname, name:res.name});
        }
      }
    );
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
    <Text style={styles.userNameText}>{username || ' ' || usersurname}</Text>
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


