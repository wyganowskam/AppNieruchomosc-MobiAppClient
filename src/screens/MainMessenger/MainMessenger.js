import React, {Component} from 'react';
import GroupsScreen from "./GroupsScreen/GroupsScreen"
import MessagesScreen from './MessageScreen/MessageScreen';
import ChatScreen from "./ChatScreen/ChatScreen"

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default class MainMessenger extends Component {

render(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="WIADOMOŚCI" component={MessagesScreen} />
      <Tab.Screen name="GRUPY" component={GroupsScreen} />

    </Tab.Navigator>
  );
}
}