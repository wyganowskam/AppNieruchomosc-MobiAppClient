import React, { Component } from 'react';
import { //Icon, 
  Button, Divider } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  Dimensions, 
  FlatList,
  Image,
  ScrollView,
  ImageBackground
} from 'react-native';
import colors from '../../config/colors';
import { Dialog, Portal,List } from 'react-native-paper';
import {getUserInfo} from '../../services/authService';
import deviceStorage from '../../services/deviceStorage';
import {refreshRoles } from "../../services/hoaService";
import {menu} from "./Menu";
 import {getHoasRoles} from '../../services/hoaService';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


export default class Profile extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      noHoaUser:false,
      username:'',
      usersurname:'',
      currentHoaId:'',
      currentHoaName:'',
      isAppAdmin: false,
      isBuildingAdmin: false,
      isBoard: false,
      isResident: false,
      hoas:[],
      hoaDialogVisible:false,
    };

    this.getInfo = this.getInfo.bind(this);
    this.getHoasRoles=getHoasRoles.bind(this);
    this.loadHoa=this.loadHoa.bind(this);
    this.renderRow=this.renderRow.bind(this);
    this.onChangeHoa=this.onChangeHoa.bind(this);
   
   
   
  }

  getInfo() {
    getUserInfo().then(
      (res) => {
      
        if(res.status === 200){
        //udało się zdobyć informacje o użytkowniku
       // this.setState({usersurname:res.data.surname, username:res.data.name});
        this.loadHoa(res.data.surname,res.data.name);
         
        }
      }
    );
  }
  
  componentDidMount() {
    this.getInfo();
  }

  loadHoa(surname,name){
   
    deviceStorage.getItem("hoaId")
    .then((res1)=>{
    {deviceStorage.getItem("hoas")
    .then((res2)=> {
     
      deviceStorage.getItem("isAppAdmin")
      .then((val1)=>{ 
        
    deviceStorage.getItem("isBuildingAdmin")
      .then((val2)=>{ 
     
    deviceStorage.getItem("isBoard")
      .then((val3)=>{ 
        
    deviceStorage.getItem("isResident")
      .then((val4)=>{
       
       
        this.setState({
          isAppAdmin:val1===true,
          isBuildingAdmin:val2===true,
          isBoard:val3===true,
          isResident:val4===true,
          hoas:JSON.parse(res2),
          currentHoaId:res1,
          currentHoaName:JSON.parse(res2).find(item=>item.hoaId===res1).hoaName,
          username:name,
          usersurname:surname
        });
      
      });
      });
      });
      });

  });}
  });
    
  }

  

 onChangeHoa(value) {

    deviceStorage.setItem("hoaId",value.hoaId)
    .then(()=>{
      refreshRoles().then(()=>{this.loadHoa(this.state.usersurname,this.state.username);  this.setState({hoaDialogVisible:false});});
      
     
    });
  
    
  };

  openDialog=()=> {
    this.setState({hoaDialogVisible:true});
  }

  hideDialog=()=> {
    this.setState({hoaDialogVisible:false});
  }

  renderRow = ({ item }) => {
 
    const {isAppAdmin,isBuildingAdmin,isResident,isBoard}=this.state;
    
    return (
      ( (isAppAdmin && item.forAppAdmin)
        || (isBuildingAdmin && item.forBuildingAdmin)
        || (isBoard && item.forBoard)
        || (isResident && item.forResident)
        || item.forAll
        ) && <> 
      <List.Item  //onPress={() => this.props.navigation.navigate(item.page)} 
      title={item.title}
      style={styles.list} 
      titleStyle={{color:colors.textViolet, fontSize:16,}}  
      right={()=><Image style={{width:10,height:10,alignSelf:"center"}} source={require('../../assets/icons/right-arrow.png')} />} 
      left={()=><Image style={{width:25,height:25,alignSelf:"center"}} source={item.icon} />} 
     /><Divider style={{height:2}} />
    
      </>
    );
  };

  renderHoas = ({ item }) => {
 
    
    return (
     
      <List.Item  onPress={()=>this.onChangeHoa(item)} 
       bottomDivider
       title={item.hoaName}/>
      
    );
  };
  
  render() {
    const {
      username,
      usersurname,
    } = this.state;
   
    return (
      <View  style={{backgroundColor:colors.white, flex:1,alignContent:"space-between"}}>
      <ImageBackground 
      source={require('../../assets/grad.png')}
    resizeMode="cover"
    style={styles.headerContainer}>
     
      <Button
           mode="text"
           labelStyle={styles.TransparentButtonText}
           compact={true}
           uppercase={false}
            onPress={this.openDialog}
            style={{paddingBottom:30, flexWrap:"wrap",flexDirection:"row"}}
          >{this.state.currentHoaName}
          </Button>
      <Text  style={styles.userNameText}>{username + ' ' + usersurname}</Text>




        </ImageBackground>

        <Portal>
          <Dialog visible={this.state.hoaDialogVisible} onDismiss={this.hideDialog}>
            <Dialog.Title>Wybierz wspólnotę</Dialog.Title>
          <Dialog.Content>
              <Divider/>
              <FlatList
                data={this.state.hoas}
                keyExtractor={(a) => a.hoaId}
                renderItem={this.renderHoas}
              />
          </Dialog.Content>
          </Dialog>
        </Portal>  
       
        <Divider/>
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
    //flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
    paddingTop: 20,
    height:150
    // backgroundColor:colors.button
  },
  userNameText: {
    color: colors.black,
    fontSize: 15,
    textAlign: 'center',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 50,
    paddingTop: 0,
    backgroundColor: colors.light,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  list: {
    borderRadius:5,
    backgroundColor:colors.white,
    margin:10
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  TransparentButtonText: {
    color: colors.black,
    
    fontSize: 18,
  },
})


