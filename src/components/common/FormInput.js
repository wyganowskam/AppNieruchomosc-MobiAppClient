import React, { Component } from 'react';
import { StyleSheet,} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

export default function FormInput  ({icon, refInput, ...otherProps}) {
 
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="gray"
    />
  );
};

const styles = StyleSheet.create({

  inputContainer: {
    width:250,
 
  
    height: 45,
    marginVertical: 10,
    alignSelf:"center",
    
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'black',
    
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#D87B7B',
  },
  
});
