import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';


export default class FailureScreen extends Component {
  constructor(props) {
    super(props);
    this.state= {
      messagesList:[],
      message:'',
    };

   
    this.getMessagesList=this.getMessagesList.bind(this);
    }
   

    getMessagesList = ()=> {
   
      /*  getMessages().then(
        res => {
          this.setState({messagesList:res.data});
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({message:resMessage});
        }
      ).catch(e => { });*/
    };

    componentDidMount() {
     // this.getMessagesList();
    }
  
    
  
  render() {
    
    return (
      <View style={styles.container}>   
       <Text style={{marginTop:50}}>Tu będą wiadomości</Text>
  
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
   
    alignItems:"center",
    
  },
 
});