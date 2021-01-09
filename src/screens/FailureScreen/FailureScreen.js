import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import colors from '../../config/colors';
import { Button,Text,List,Divider,FAB} from 'react-native-paper';
import {getUserInfo} from '../../services/authService';
import {getAllFailuresByUserId} from '../../services/failureService';

export default class FailureScreen extends Component {
  constructor(props) {
    super(props);
    this.state= {
      failureList:'',
      message:'',
    };

    this.renderRow=this.renderRow.bind(this);
    this.handleAddButton=this.handleAddButton.bind(this);
    this.getFailuresList=this.getFailuresList.bind(this);
    }
    renderRow = ({ item }) => {
   
      return (
        <>
        <List.Item onPress={() =>{this.props.navigation.navigate('FailureDetails',{item: item,})}}
          title={item.title}
          titleStyle={{fontWeight:"bold",color:colors.button}}
          style={{backgroundColor:colors.lightWhite}}
          description={"Status: " + item.status.name}
        />
        <Divider/>
        </>
      );
    };
    handleAddButton = () => {
      this.props.navigation.navigate('FailureAdd');
    };

    getFailuresList = ()=> {
   
      getAllFailuresByUserId().then(
        res => {
          this.setState({failureList:res.data});
          
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
      this.getFailuresList();
    }
  
    
  
  render() {
    
    return (
      <View style={styles.container}>   
        <Text style={{color:'red'}}>{this.state.message}</Text>
        <ScrollView>
            <FlatList
              data={this.state.failureList}
              keyExtractor={(a) => a.id}
              renderItem={this.renderRow}
            />
          </ScrollView> 
          <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={this.handleAddButton}
                />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: colors.lightWhite,
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
  fab: {
    position: 'absolute',
    margin: 15,
    right: 0,
    top: 0,
    backgroundColor: colors.violet
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