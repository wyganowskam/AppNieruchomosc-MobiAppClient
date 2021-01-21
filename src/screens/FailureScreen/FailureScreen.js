import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ScrollView ,Image} from 'react-native';
import colors from '../../config/colors';
import { Button,Text,List,Divider,FAB,Card} from 'react-native-paper';
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
    this.getStatusColor=this.getStatusColor.bind(this);
    }

    
    renderRow = ({ item }) => {
      const col=this.getStatusColor(item.status.name);
      
      return (
        <>
        <Card  style={{marginBottom:0,marginLeft:7, marginRight:7,borderRadius:20,marginTop:7}} 
          
            onPress={() =>{this.props.navigation.navigate('FailureDetails',{item: item,})}}
            >
        
             <Card.Title  
               title={item.title} 
               subtitle={<Text style={{fontSize:14}} ><Text>
                {"Status: "}<Text style={{color:col}}> {item.status.name+"\n"}</Text>
              </Text></Text>
            }
               titleStyle={{fontSize:18, color:colors.black,margin:0}} 
              // subtitleStyle={{fontSize:14,color:colors.grey}}
               left={()=><Image style={{width:28,height:28,alignSelf:"center",margin:0}} source={require('../../assets/icons/alert.png')} />} 
               leftStyle={{margin:0,paddingRight:0}}
             />
             <Card.Content>
               <Divider style={{ marginBottom:5}} />
               <View style={{flexDirection:"row",justifyContent:"space-between",flex:1}}>
                   <Text >{item.date}</Text> 
                   <Text style={{alignSelf:"flex-end",textAlign:"right"}}>{item.comment && <Text> "Dodano komentarz"</Text>}</Text>
               </View>
           
             </Card.Content> 
           </Card>
        
        </>
      );
    };
    handleAddButton = () => {
      this.props.navigation.navigate('FailureAdd');
    };

    getStatusColor = (name) => {
      if(name === "Nowa") return colors.happyGreen;
      if(name === "Realizowana") return colors.calmBlue;
      if(name === "Zamknięta") return colors.brown;
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

<View style={{height:50,backgroundColor:colors.white,flexDirection:"row",}}>
        <Button
            mode="text"
            labelStyle={styles.TransparentButtonText}
            compact={true}
            uppercase={false}
           // onPress={previousPage}
            style={{alignSelf:"center"}}
          > <Image style={{width:20,height:20,alignSelf:"center"}} source={require('../../assets/icons/left-arrow-bold.png')} />
              
            </Button>
        <Text style={{fontSize:20,alignSelf:"center",marginLeft:6,paddingBottom:2}}>
        {/* {page} */}
        312878
         </Text>
          <Button
            mode="text"
            labelStyle={styles.TransparentButtonText}
            compact={true}
            uppercase={false}
           // onPress={nextPage}
            style={{alignSelf:"center"}}
          > <Image style={{width:20,height:20,alignSelf:"center"}} source={require('../../assets/icons/right-arrow-bold.png')} />
              
            </Button>
            <FAB
                style={styles.fab}
                small
                icon={props=><Image style={{width:20,height:20,alignSelf:"center",marginTop:2}} source={require('../../assets/icons/plus.png')} />}
                onPress={this.handleAddButton}
                />
        </View>
        {this.state.message!=='' && <Text style={{color:colors.error}}>{this.state.message}</Text>}
        <FlatList
              data={this.state.failureList}
              keyExtractor={(a) => a.id}
              renderItem={this.renderRow}
            />
         
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.delicateButton,
    margin:0
  },
  list: {
   
    borderTopWidth: 1,
    borderColor: colors.greyOutline,
  },
  subtitleView: {
    flexDirection: 'row',
   
  },
  fab: {
    position: 'absolute',
    margin: 15,
    right: 0,
    top: 0,
    backgroundColor: colors.delicateButton,
    marginTop:5
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
   
   
  },
  button: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 45,
    alignSelf:'center',
    backgroundColor:'gray'
  },
});