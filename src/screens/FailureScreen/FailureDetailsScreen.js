import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView,Image ,ActivityIndicator } from 'react-native';
import {Text,Button, Divider } from 'react-native-paper';
import {failureList} from './failureData';
import colors from '../../config/colors';
import { Card, Title, Paragraph } from 'react-native-paper';
import {getPicture} from "../../services/failureService";
import base64 from 'react-native-base64'


export default class FailureDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      failureElement:'',
      status:'',
      dialogVisible:false,
      picture:null,
      loadig:false
    };
   
    }
   
    componentDidMount() {
      const failure=this.props.route.params.item;
   
    
      this.setState({failureElement:failure, status:failure.status});
      if (failure.picture)  {
        this.setState({loading:true})
        getPicture(failure.id).then(
          res => { 
           
            const arr=new Uint8Array(res.data)
            const pic= base64.encodeFromByteArray(arr);
            this.setState({picture:pic});
          },
          (error) => {
          
          }
        ).catch(e => { });}
    
    }

    getStatusColor = (name) => {
      if(name === "Nowa") return colors.happyGreen;
      if(name === "Realizowana") return colors.calmBlue;
      if(name === "Zamknięta") return colors.brown;
  };

  

  
    render() {
      const {failureElement,status}=this.state;
      const col=this.getStatusColor(this.state.status.name);
      
        return (
          <ScrollView style={{backgroundColor:colors.greyViolet}} >
            <Card style={{margin:10,marginBottom:0}}>
            
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
          {this.state.loading && <View style={{margin:20,color:colors.button}}><Text style={{fontSize:20,alignSelf:"center"}}>Zdjęcie</Text><ActivityIndicator size="large" style={{margin:5}} color={colors.button}/></View>}
            {this.state.picture && <Image  onLoadStart={()=>this.setState({loading:false})}    source={{uri: `data:image;base64,${this.state.picture}`}} style={{margin:10, minHeight:300,flex:1, resizeMode: "contain", }}
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