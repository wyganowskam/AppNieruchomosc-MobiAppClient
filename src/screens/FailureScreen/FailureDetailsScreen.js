import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView  } from 'react-native';
import {Text} from 'react-native-paper';
import {failureList} from './failureData';
import colors from '../../config/colors';
import { Card, Title, Paragraph } from 'react-native-paper';


export default class FailureDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      failureElement:'',
      status:'',
    };
   
    }
   
    componentDidMount() {
      const failure=this.props.route.params.item;
      //console.log(failure);
    
      this.setState({failureElement:failure, status:failure.status});
    
    }
  
  
    render() {
      const {failureElement,status}=this.state;
        return (
          <ScrollView style={{margin:10}} >
            <Card>
              <Card.Title title={failureElement.title} subtitle="typ zgłoszenia" titleStyle={{fontSize:18, color:colors.darkviolet}} />
              <Card.Content>
             
                <Paragraph>
                <Text><Text style={{fontWeight: "bold"}}>{"Data: "}</Text>{ failureElement.date+"\n"}</Text>
                <Text><Text style={{fontWeight: "bold"}}>{"Adres: "} </Text> {failureElement.address+"\n"}</Text>
                <Text ><Text style={{fontWeight: "bold"}}>{"Status: "} </Text>{this.state.status.description+"\n"}</Text>
                <Text><Text style={{fontWeight: "bold"}}>{"Opis: \n" } </Text>{failureElement.description+"\n"}</Text>
              </Paragraph>
              </Card.Content> 
            </Card>
        
          </ScrollView>
        );
      }
}






const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 50,
    paddingTop: 0,
    backgroundColor: '#293046',
   
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: colors.greyOutline,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});