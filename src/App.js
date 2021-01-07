
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import MainScreen from './screens/MainScreen/MainScreen';
import { IconButton} from 'react-native-paper';
import {Image} from 'react-native';
// import ChatScreen from "./screens/MainMessenger/ChatScreen/ChatScreen";
import MessageScreen from "./screens/MainMessenger/MessageScreen/MessageScreen"
import FailureScreen from './screens/FailureScreen/FailureScreen';
import NewMessageScreen from "./screens/MainMessenger/NewMessageScreen/NewMessageScreen"
import FailureDetailsScreen from './screens/FailureScreen/FailureDetailsScreen';
import FailureAddScreen from './screens/FailureScreen/FailureAddScreen';
import InvitationScreen from "./screens/InvitationScreen/InvitationScreen"
import ResetPasswordScreen from './screens/ResetPasswordScreen/ResetPasswordScreen';
import deviceStorage from './services/deviceStorage';
import {logout} from './services/authService';
import {Button, Icon} from 'react-native-paper'
import {revokeToken} from './services/userService'
import {getHoasRoles} from './services/hoaService';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
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

          {/* <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'LOGOWANIE' }} initialParams={{newJWT:this.newJWT}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'REJESTRACJA', }}/>
          <Stack.Screen name="Reset" component={ResetPasswordScreen} options={{ title: 'RESETOWANIE HASŁA' }} /> */}
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
          <Stack.Screen name="Failure" component={FailureScreen} options={{ title: 'AWARIE' }} />
          <Stack.Screen name="FailureDetails" component={FailureDetailsScreen} options={{ title: 'AWARIA' }}  />
          <Stack.Screen name="FailureAdd" component={FailureAddScreen} options={{ title: 'NOWA AWARIA' }}  />
          <Stack.Screen name="Messages" component={MessageScreen} options={{ title: 'KOMUNIKATOR', }}  />
          <Stack.Screen  name="NewMessage" component={NewMessageScreen} options={{ title: 'NOWY WĄTEK', }}  /> 
          {/* <Stack.Screen  name="Chat" component={ChatScreen} options={{ title: '', }}  />
         */}
          </>)}
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    );
  }
}

