import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import MainScreen from './screens/MainScreen/MainScreen';
import ChatScreen from "./screens/MainMessenger/ChatScreen/ChatScreen";
import MainMessenger from './screens/MainMessenger/MainMessenger';
import FailureScreen from './screens/FailureScreen/FailureScreen';
import NewMessageScreen from "./screens/MainMessenger/NewMessageScreen/NewMessageScreen"
import FailureDetailsScreen from './screens/FailureScreen/FailureDetailsScreen';
import FailureAddScreen from './screens/FailureScreen/FailureAddScreen';
import InvitationScreen from "./screens/InvitationScreen/InvitationScreen"
import ResetPasswordScreen from './screens/ResetPasswordScreen/ResetPasswordScreen';
import AnnouncementsScreen from './screens/AnnouncementScreen/Announcements';
import AnnouncementDetailsScreen from './screens/AnnouncementScreen/Announcement';
import AnnouncementAddScreen from './screens/AnnouncementScreen/AnnouncementAdd';
import SurveyListScreen from './screens/SurveyScreen/SurveyListScreen';
import SurveyScreen from './screens/SurveyScreen/SurveyScreen';
import CreateSurveyScreen from './screens/SurveyScreen/CreateSurveyScreen';
import { setAuthHeader } from './api/ApiClient';
import deviceStorage from './services/deviceStorage';
import {logout} from './services/authService';
import {Button, Icon} from 'react-native-elements'
import {revokeToken} from './services/userService'
import {getHoasRoles} from './services/hoaService';
const Stack = createStackNavigator();

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
    this.loadHoa=this.loadHoa.bind(this);
    this.loadJWT().then(()=>{
      if(this.state.jwt!='') this.loadHoa(); 
    });
  }
  logout() {
    revokeToken();
    this.deleteJWT();
    
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
                isResident:val4==='true',
                
              });
            });
            });
            });
            });
          });

    
  }

 
  render() {
    return (
      <NavigationContainer >
        <Stack.Navigator 
         
          screenOptions={{
            headerTitleStyle: {color:'white', },
            headerStyle: {
              backgroundColor: 'gray',
              borderBottomColor:'white',
            
            },
            headerRight: () => (
              this.state.jwt && (<Button
                onPress={this.logout}
                buttonStyle={{ backgroundColor: 'transparent' }}
                underlayColor="transparent"
                icon={
                  <Icon
                    name='logout'
                    type='antdesign'
                    
                    color="black"
                  />
                }
              />)
            ), 

        }}>
          {this.state.jwt=='' ? (
          <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'LOGOWANIE' }} initialParams={{newJWT:this.newJWT}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'REJESTRACJA', }}/>
          <Stack.Screen name="Reset" component={ResetPasswordScreen} options={{ title: 'RESETOWANIE HASŁA' }} />
          </>
          ) : (
          <>
          <Stack.Screen  name="Main" component={MainScreen} options={{ title: 'MENU', }}  />
          <Stack.Screen  name="Messages" component={MainMessenger} options={{ title: 'KOMUNIKATOR', }}  />
          <Stack.Screen  name="MyInvitations" component={InvitationScreen} options={{ title: 'ZAPROSZENIA', }}  />
          <Stack.Screen name="Failure" component={FailureScreen} options={{ title: 'AWARIE' }} />
          <Stack.Screen name="FailureDetails" component={FailureDetailsScreen} options={{ title: 'AWARIA' }}  />
          <Stack.Screen name="FailureAdd" component={FailureAddScreen} options={{ title: 'NOWA AWARIA' }}  />
          <Stack.Screen  name="Chat" component={ChatScreen} options={{ title: 'Czat', }}  />
          <Stack.Screen  name="NewMessage" component={NewMessageScreen} options={{ title: 'NOWA WIADOMOŚĆ', }}  />
          <Stack.Screen  name="Announcements" component={AnnouncementsScreen} options={{ title: 'TABLICA OGŁOSZEŃ', }}  />
          <Stack.Screen  name="AnnouncementDetails" component={AnnouncementDetailsScreen} options={{ title: 'SZCZEGÓŁY OGŁOSZENIA', }}  />
          <Stack.Screen  name="AnnouncementAdd" component={AnnouncementAddScreen} options={{ title: 'DODAJ OGŁOSZENIE', }}  />
          <Stack.Screen  name="Surveys" component={SurveyListScreen} options={{ title: 'ANKIETY', }}  />
          <Stack.Screen  name="SurveyDetails" component={SurveyScreen} options={{ title: 'ANKIETA', }}  />
          <Stack.Screen  name="SurveyAdd" component={CreateSurveyScreen} options={{ title: 'STWÓRZ ANKIETĘ', }}  />

          </>)}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

