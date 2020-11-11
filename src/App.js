import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import MainScreen from './screens/MainScreen/MainScreen';
import FailureScreen from './screens/FailureScreen/FailureScreen';
import FailureDetailsScreen from './screens/FailureScreen/FailureDetailsScreen';
import FailureAddScreen from './screens/FailureScreen/FailureAddScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen/ResetPasswordScreen';
import { setAuthHeader } from './api/ApiClient';
import deviceStorage from './services/deviceStorage';
import {Button, Icon} from 'react-native-elements'
import {revokeToken} from './services/userService'

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      loading: true
    }

    this.newJWT = deviceStorage.newJWT.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.logout=this.logout.bind(this);
    this.loadJWT();
  }
  logout() {
    revokeToken();
    this.deleteJWT();
  }

  render() {
    return (
      <NavigationContainer >
        <Stack.Navigator 
         
          screenOptions={{
            headerTitleStyle: { textAlign:"center", flex:1, color:'white', },
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
          <Stack.Screen name="Failure" component={FailureScreen} options={{ title: 'AWARIE' }} />
          <Stack.Screen name="FailureDetails" component={FailureDetailsScreen} options={{ title: 'AWARIA' }}  />
          <Stack.Screen name="FailureAdd" component={FailureAddScreen} options={{ title: 'NOWA AWARIA' }}  />
          </>)}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

