import React, { Component } from 'react';
import { StyleSheet,} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import colors from "../../config/colors"
export default function FormInput  ({icon, refInput, ...otherProps}) {
 
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={{
        width:250,
        height: 45,
        marginVertical: 10,
        alignSelf:"center",
        
      }}
      inputStyle={{
        flex: 1,
        marginLeft: 10,
        color: colors.black,
        fontSize: 16,
      }}
      autoFocus={false}
      autoCapitalize="none"
      errorStyle={{
        marginTop: 0,
        textAlign: 'center',
        color: colors.error,
      }}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor={colors.grey}
    />
  );
};


