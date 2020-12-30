import React, { Component } from 'react';
import { Avatar, Card, Icon, Button } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  Dimensions, 
  FlatList
} from 'react-native';
import colors from '../../config/colors';
import { Dialog, Portal } from 'react-native-paper';
import { ListItem} from 'react-native-elements';
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
    this.renderHoas=this.renderHoas.bind(this);
    this.onChangeHoa=this.onChangeHoa.bind(this);
    this.openDialog=this.openDialog.bind(this);
    this.hideDialog=this.hideDialog.bind(this);
    
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
              this.getInfo();
              console.log(res1);
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

  openDialog=()=> {
    this.setState({hoaDialogVisible:true});
  }

  hideDialog=()=> {
    this.setState({hoaDialogVisible:false});
  }

  renderHoas = ({ item }) => {
 
    
    return (
     
      <ListItem  onPress={()=>this.onChangeHoa(item)} 
       bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.hoaName}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
     
    );
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
   
   if(this.state.currentHoaId===''&& this.state.noHoaUser===false) {this.loadHoa();
    this.setState({noHoaUser:true})
   }
   console.log("render");
    return (
      <View>
      <View style={styles.headerContainer}>
     
      <Button
            title={this.state.currentHoaName}
            titleStyle={styles.TransparentButtonText}
            containerStyle={{ flex:-1 }}
            buttonStyle={{ backgroundColor: 'transparent' }}
            underlayColor="transparent"
            onPress={this.openDialog}
          />
      <Text style={styles.userNameText}>{username + ' ' + usersurname}</Text>
      <Portal>
      <Dialog visible={this.state.hoaDialogVisible} onDismiss={this.hideDialog}>
        <Dialog.Title>Wybierz wspólnotę</Dialog.Title>
       <Dialog.Content>
     
         <FlatList
            data={this.state.hoas}
            keyExtractor={(a) => a.hoaId}
            renderItem={this.renderHoas}
          />
       </Dialog.Content>
      </Dialog>
    </Portal>  


        </View>
        
          <FlatList
            key={this.state.hoas}
            data={menu}
            keyExtractor={(a) => a.title}
            renderItem={this.renderRow}
          />
       
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
    fontSize: 15,
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
  TransparentButtonText: {
    color: 'black',
   
    fontSize: 18,
  },
})


