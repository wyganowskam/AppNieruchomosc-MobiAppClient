
import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, LayoutAnimation, LogBox, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import colors from './colors';

const styles= StyleSheet.create({

    container: {
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      backgroundColor: colors.base,
    },
    logo: {
      marginTop:100,
      alignSelf:'center',
      height: 150,
      width: 150,
      
    },
    form : {
      marginHorizontal:30,
    },
    inputTitle: {
      color: colors.dark,
      fontSize:10,
      textTransform:'uppercase',
    },
    appname: {
      color:colors.dark,
      fontSize:40,
    
      alignSelf:"center",
      marginTop:100,
      fontWeight:"500",
      
    },
    input: {
      borderBottomColor:colors.black,
      borderBottomWidth: StyleSheet.hairlineWidth,
      backgroundColor: colors.base,
      height:40,
      fontSize:15,
      color: colors.dark,
      
    },
    passwordInputMargin: {
      marginTop:32,
    },
    loginButton: {
      marginHorizontal: 30,
      marginTop: 30,
      backgroundColor: colors.mid,
      borderRadius: 4,
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: colors.dark,
      fontWeight: '500',
    },
    buttonLink: {
      fontWeight: '500',
      color: colors.dark,
    },
    bottomButton: {
      alignSelf: 'center',
      marginTop: 32,
    },
    errorMessage: {
      height: 72,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 30,
    },
    error: {
      color: colors.mid,
      fontSize: 13,
      fontWeight: '600',
      textAlign: 'center',
    },
    registerButton: {
      marginHorizontal: 30,
      marginTop: 30,
      backgroundColor: '#2abfed',
      borderRadius: 4,
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  });

  export default styles;