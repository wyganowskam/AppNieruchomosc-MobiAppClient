import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { ListItem,Text } from 'react-native-elements';
import Row from "./InvitationRow";
import colors from '../../config/colors';
import { Button} from 'react-native-elements';
import {getMyInvitations} from '../../services/invitationService';


export default class FailureScreen extends Component {
  constructor(props) {
    super(props);
    this.state= {
      invitationList:[],
      message:'',
    };

   
    this.getInvitationList=this.getInvitationList.bind(this);
    }
   

    getInvitationList = ()=> {
   
        getMyInvitations().then(
        res => {
          this.setState({invitationList:res.data});
          
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
    
    return (
      <View style={styles.container}>   
        
        {this.state.invitationList.length > 0 ?
            <>
            {this.state.invitationList.map((row) => (
            <Row key={row.id} navigation={this.props.navigation} row={row}/>
             ))}
            </>
        :
            <Text style={{marginTop:50}}>Brak nowych zaproszeń</Text>}
  
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