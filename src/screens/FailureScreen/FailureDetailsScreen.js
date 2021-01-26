import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView,Image  } from 'react-native';
import {Text,Button, Divider } from 'react-native-paper';
import {failureList} from './failureData';
import colors from '../../config/colors';
import { Card, Title, Paragraph } from 'react-native-paper';
import {getPicture} from "../../services/failureService"


export default class FailureDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      failureElement:'',
      status:'',
      dialogVisible:false,
      picture:null
    };
   
    }
   
    componentDidMount() {
      const failure=this.props.route.params.item;
   
    
      this.setState({failureElement:failure, status:failure.status});
      getPicture(failure.id).then(
        res => { 
          console.log(res);
          this.setState({picture:res});
  
        },
        (error) => {
         
        }
      ).catch(e => { });
    
    }

    getStatusColor = (name) => {
      if(name === "Nowa") return colors.happyGreen;
      if(name === "Realizowana") return colors.calmBlue;
      if(name === "Zamknięta") return colors.brown;
  };

  
    render() {
      const {failureElement,status}=this.state;
    //  console.log(failureElement)
      const col=this.getStatusColor(this.state.status.name);
      
        return (
          <ScrollView style={{backgroundColor:colors.delicateButton}} >
            <Card style={{margin:10}}>
            
              <Card.Content>
             
                <Text style={{fontSize:20, color:colors.black}}>{failureElement.title}</Text>
               
                <Divider style={{marginBottom:10}}/>
                <Paragraph style={{}}>
                <Text style={styles.text}>{"Status:\n"}</Text>
                <Text style={styles.text2}><Text style={{color:col}}>{this.state.status.description+"\n\n"}</Text></Text>
                <Text style={styles.text}>{"Data zgłoszenia:\n"}</Text>
                <Text style={styles.text2}>{failureElement.date+"\n\n"}</Text>
                <Text style={styles.text}>{"Typ zgłoszenia:\n"}</Text>
                <Text  style={styles.text2}>{failureElement.type?.title +"\n\n"}</Text>
                {failureElement.address ? <><Text style={styles.text}>{"Adres:\n"}</Text>
                <Text  style={styles.text2} >{failureElement.address+"\n\n"}</Text></> : <><Text style={styles.text}>{"Adres:\n"}</Text><Text   style={styles.text2}>{"Nie dotyczy\n\n"}</Text></>}
               
                <Text style={styles.text}>{"Opis: \n"}</Text>
                <Text  style={styles.text2}>{failureElement.description+"\n"}</Text>
                {failureElement.comment &&  <Text  style={styles.text} ><Text style={{fontWeight: "bold",color:colors.backgroundViolet}}>{"\nKomentarz: "} </Text>{failureElement.comment}</Text>}
                </Paragraph>
              </Card.Content> 
            </Card>

            {this.state.picture && <Image  source={{uri: `data:image/png;base64,${this.state.picture}`}} style={{width: 100, height: 50, resizeMode: Image.resizeMode.contain, borderWidth: 1, borderColor: 'red'}}
          />}
            
        
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
  TransparentButtonText: {
    color: colors.backgroundViolet,
    fontSize: 15,
    
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
  text: {
    marginBottom:2,
    fontSize:16,
    lineHeight:30,
    fontWeight:"bold"
  },
  text2: {
    marginBottom:2,
    fontSize:16,
  }
});