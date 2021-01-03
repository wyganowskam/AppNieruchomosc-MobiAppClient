import React, { Component } from 'react';
import { StyleSheet,} from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from "../../config/colors"
export default function FormInput  ({icon, refInput, ...otherProps}) {
 
  return (
    <TextInput
      {...otherProps}
      ref={refInput}
      // inputContainerStyle={{
      //   width:250,
      //   height: 45,
      //   marginVertical: 10,
      //   alignSelf:"center",
        
      // }}
      style={{
        flex: 1,
        marginLeft: 10,
        color: colors.black,
        fontSize: 16,
      }}
      
      // errorStyle={{
      //   marginTop: 0,
      //   textAlign: 'center',
      //   color: colors.error,
      // }}
      // autoCorrect={false}
      // blurOnSubmit={false}
      // placeholderTextColor={colors.grey}
    />
  );
};


