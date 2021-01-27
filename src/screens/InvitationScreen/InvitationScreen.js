import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { Text ,Card} from 'react-native-paper';
import Row from "./InvitationRow";
import colors from '../../config/colors';
import {getMyInvitations} from '../../services/invitationService';

export default class FailureScreen extends Component {
  constructor(props) {
    super(props);
    this.state= {
      invitationList:[],
      message:'',
      loading:true,
    };

   
    this.getInvitationList=this.getInvitationList.bind(this);
    }
   

    getInvitationList = ()=> {
      
        getMyInvitations().then(
        res => {
          this.setState({invitationList:res.data,loading:false});
          
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
      ).catch(e => { });
    };

    componentDidMount() {
     
      this.getInvitationList();
    }
  
    
  
  render() {
    console.log("ładuje");
    console.log(this.state)
    return (
      <View style={styles.container}>   
        
        {this.state.invitationList.length > 0 && !this.state.loading ?
            <>
            {this.state.invitationList.map((row) => (
            <Row key={row.id} navigation={this.props.navigation} row={row} getInvitationList={this.getInvitationList}/>
             ))}
            </>
        :
        
        <Card style={{margin:10, marginTop:60, height:50, backgroundColor:colors.happyGreen,alignSelf:"center"}}>
          <Card.Content>
          <Text >Brak nowych zaproszeń</Text>
          </Card.Content>
        </Card>
       
      }
  
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.light,
    alignItems:"center",    
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
  
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
   
  },
  button: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 45,
    alignSelf:'center',
    backgroundColor:'gray'
  },
});