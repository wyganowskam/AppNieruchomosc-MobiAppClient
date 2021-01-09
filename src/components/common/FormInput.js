import React, { Component } from 'react';
import { StyleSheet,} from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from "../../config/colors"
export default function FormInput  ({icon, refInput, ...otherProps}) {
 
  return (
    <TextInput
      {...otherProps}
      ref={refInput}
     
      style={{
        flex: 1,
        marginLeft: 10,
        color: colors.black,
        fontSize: 16,
      }}
     
    />
  );
};


