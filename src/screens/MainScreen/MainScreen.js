import React, { Component } from 'react';
import { Avatar, Card, Icon } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  Dimensions, 
  FlatList
} from 'react-native';
import colors from '../../config/colors';
import { ScrollView } from 'react-native-gesture-handler';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {  ListItem} from 'react-native-elements';
import Menu from './Menu';
import {getUserInfo} from '../../services/authService';
import deviceStorage from '../../services/deviceStorage';
import {refreshRoles } from "../../services/hoaService";
import {menu} from "./Menu";
 //import PhotoUpload from 'react-native-photo-upload';
 import {getHoasRoles} from '../../services/hoaService';

const avatar={uri: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"};
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;



export default class Profile extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      usersurname:'',
      currentHoaId:'',
      isAppAdmin: false,
      isBuildingAdmin: false,
      isBoard: false,
      isResident: false,
      hoas:[]
    };

    this.getInfo = this.getInfo.bind(this);
    this.getHoasRoles=getHoasRoles.bind(this);
    this.loadHoa=this.loadHoa.bind(this);
    this.renderRow=this.renderRow.bind(this);
    this.onChangeHoa=this.onChangeHoa.bind(this);
    
    this.getInfo();
    this.loadHoa();
  }

  getInfo() {
   
   
    getUserInfo().then(
      (res) => {
      
        if(res.status === 200){
        //udało się zdobyć informacje o użytkowniku
         this.setState({usersurname:res.data.surname, username:res.data.name});
         
          
        }
      }
    );
  }

  loadHoa(){
    deviceStorage.getItem("hoaId")
    .then((res1)=>{
    
    if (res1!=undefined) {deviceStorage.getItem("hoas")
    .then((res2)=> {

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
                isResident:val4==='true',
                hoas:JSON.parse(res2),
                currentHoaId:res1,
              });
         
             
            });
            });
            });
            });
          });
  });}
  });
    
  }

 onChangeHoa = e => {
    const hoa = e.target.value;
   
    deviceStorage.setItem("hoaId", hoa)
    .then(()=>{
      refreshRoles().then(()=>{ this.loadHoa();});
      
     
    });
  
    
  };

  renderRow = ({ item }) => {
 
    const {isAppAdmin,isBuildingAdmin,isResident,isBoard}=this.state;
   
    return (
      ( (isAppAdmin && item.forAppAdmin)
        || (isBuildingAdmin && item.forBuildingAdmin)
        || (isBoard && item.forBoard)
        || (isResident && item.forResident)
        ) && <> 
      <ListItem  onPress={() => 
        this.props.navigation.navigate(item.page)} bottomDivider>
        <Icon name={item.icon } type='antdesign'/>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      </>
    );
  };
  
  render() {
    const {
      username,
      usersurname,
    } = this.state;
  
    return (
      <View>
      <View style={styles.headerContainer}>
        <Avatar size='xlarge' rounded  imageProps={{resizeMode:'cover'}} source={avatar}  activeOpacity={0.7}/>
        <Text style={styles.userNameText}>{username + ' ' + usersurname}</Text>
        <TextField
          select
          value = {this.state.currentHoaId}
          label="Aktualna Wspólnota"
          style={{marginLeft:20, width:350, alignSelf:"center"}}
          onChange={this.onChangeHoa}
        >
         {this.state.hoas.map((hoa) => (
            <MenuItem key={ hoa.hoaName} value={hoa.hoaId}>
              {hoa.hoaName}
            </MenuItem>
          ))}
        </TextField>


        </View>
        <ScrollView>
      
          <FlatList
            key={this.state.hoas}
            data={menu}
            keyExtractor={(a) => a.title}
            renderItem={this.renderRow}
          />
        </ScrollView>
   
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
  container: {
    flexGrow: 1,
    paddingBottom: 50,
    paddingTop: 0,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: colors.greyOutline,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
})


