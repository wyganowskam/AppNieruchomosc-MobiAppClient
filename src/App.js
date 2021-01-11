
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import MainScreen from './screens/MainScreen/MainScreen';
import { IconButton} from 'react-native-paper';
import {Image} from 'react-native';
import ChatScreen from "./screens/MainMessenger/ChatScreen/ChatScreen";
import MessageScreen from "./screens/MainMessenger/MessageScreen/MessageScreen"
import FailureScreen from './screens/FailureScreen/FailureScreen';
import NewMessageScreen from "./screens/MainMessenger/NewMessageScreen/NewMessageScreen"
import FailureDetailsScreen from './screens/FailureScreen/FailureDetailsScreen';
import FailureAddScreen from './screens/FailureScreen/FailureAddScreen';
import InvitationScreen from "./screens/InvitationScreen/InvitationScreen"
import ResetPasswordScreen from './screens/ResetPasswordScreen/ResetPasswordScreen';
import Announcements from "./screens/AnnouncementScreen/AnnouncmentsScreen";
import AnnouncementAdd from "./screens/AnnouncementScreen/AnnouncementAdd"
import  AnnDet from "./screens/AnnouncementScreen/Announcement";
import Survey from "./screens/SurveyScreen/SurveyScreen"
import Surveys from "./screens/SurveyScreen/SurveyListScreen"
import CreateSurvey from "./screens/SurveyScreen/CreateSurveyScreen"
import deviceStorage from './services/deviceStorage';
import {logout} from './services/authService';
import {Button, Icon} from 'react-native-paper'
import {revokeToken} from './services/userService'
import {getHoasRoles} from './services/hoaService';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { AppRegistry } from 'react-native';
const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: '#B0A3D4',
  },
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      loading: true,
      isAppAdmin: false,
      isBuildingAdmin: false,
      isBoard: false,
      isResident: false,
    }

    this.newJWT = deviceStorage.newJWT.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.logout=this.logout.bind(this);
   
    this.loadJWT();
    //console.log(this.state.jwt);
  }
  logout() {
    console.log("wylogowanie");
    revokeToken().catch(() => {
        deviceStorage.removeItem("id_token");
        deviceStorage.removeItem("hoaId");
        deviceStorage.removeItem("hoas");
        deviceStorage.removeItem("isAppAdmin");
        deviceStorage.removeItem("isBuildingAdmin");
        deviceStorage.removeItem("isBoard");
        deviceStorage.removeItem("isResident");
    
       
      });
      deviceStorage.removeItem("id_token");
      deviceStorage.removeItem("hoaId");
      deviceStorage.removeItem("hoas");
      deviceStorage.removeItem("isAppAdmin");
      deviceStorage.removeItem("isBuildingAdmin");
      deviceStorage.removeItem("isBoard");
      deviceStorage.removeItem("isResident");
      this.deleteJWT();
  }

  
 
  render() {
    return (
      <PaperProvider theme={theme}>
      <NavigationContainer >
        <Stack.Navigator 
         
          screenOptions={{
            headerTitleStyle: {color:'black', },
            headerStyle: {
              
              borderBottomColor:'transparent',
            
            },
            headerRight: () => (
              this.state.jwt && 
              (<IconButton
                onPress={this.logout}
                buttonStyle={{ backgroundColor: 'white' }}
                underlayColor="transparent"
                icon={props=><Image style={{width:25,height:25,alignSelf:"center"}} source={require('./assets/icons/logout.png')} />} 
              />)
            ), 

        }}>

        
          {this.state.jwt==='' ? (

          <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'LOGOWANIE' }} initialParams={{newJWT:this.newJWT}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'REJESTRACJA', }}/>
          <Stack.Screen name="Reset" component={ResetPasswordScreen} options={{ title: 'RESETOWANIE HASŁA' }} />
          </>
          ) : (
          <>
         
          <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Dzień dobry', }}  />
          <Stack.Screen name="MyInvitations" component={InvitationScreen} options={{ title: 'ZAPROSZENIA', }}  />
          <Stack.Screen name="Failure" component={FailureScreen} options={{ title: 'ZGŁOSZENIA' }} />
          <Stack.Screen name="FailureDetails" component={FailureDetailsScreen} options={{ title: 'ZGŁOSZENIE' }}  />
          <Stack.Screen name="FailureAdd" component={FailureAddScreen} options={{ title: 'NOWE ZGŁOSZENIE' }}  />
          <Stack.Screen name="Messages" component={MessageScreen} options={{ title: 'KOMUNIKATOR', }}  />
          <Stack.Screen  name="NewMessage" component={NewMessageScreen} options={{ title: 'NOWY WĄTEK', }}  /> 
          <Stack.Screen  name="Chat" component={ChatScreen} options={{ title: '', }}  />
          <Stack.Screen name="Annoucments" component={Announcements} options={{ title: 'TABLICA OGŁOSZEŃ', }}  />
          <Stack.Screen name="AnnoucmentDet" component={ AnnDet} options={{ title: 'OGŁOSZENIE', }}  />
          <Stack.Screen name="AnnoucmentAdd" component={ AnnouncementAdd} options={{ title: 'NOWE OGŁOSZENIE', }}  />
          <Stack.Screen name="SurveyDet" component={Survey} options={{ title: 'SZCZEGÓŁY', }}  />
          <Stack.Screen name="Surveys" component={ Surveys} options={{ title: 'GŁOSOWANIA I ANKIETY', }}  />
          <Stack.Screen name="NewSurvey" component={ CreateSurvey} options={{ title: 'NOWE GŁOSOWANIE/ANKIETA', }}  />
          </>)}
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    );
  }
}

AppRegistry.registerComponent('albums', () => App);
