import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ScrollView ,Image} from 'react-native';
import { TextInput } from 'react-native-paper';
import TextField from '@material-ui/core/TextField';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../config/colors';
import { Button,Text,Dialog, Portal,List, Divider } from 'react-native-paper';
import {addFailure} from '../../services/failureService';
import MenuItem from '@material-ui/core/MenuItem';
import sharesService from '../../services/sharesService';
export default class FailureAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
        isLoading:false,
        title:'',
        description:'',
        apartment:'',
        apartmentName:'',
        apartments:[],
        message:'',
        uriList:[],
        apartmentDialogVisible:false,
    }
   this.pickImage=this.pickImage.bind(this);
   this.renderImage=this.renderImage.bind(this);
   this.validate=this.validate.bind(this);
   this.handleAddButton=this.handleAddButton.bind(this);
   this.getApartmentsList=this.getApartmentsList.bind(this);
   this.onChangeApartment=this.onChangeApartment.bind(this);
   this.hideApartmentDialog=this.hideApartmentDialog.bind(this);
   this.handleXPress=this.handleXPress.bind(this);
    }

    validate= () => {
      const {title,description,apartmentId}=this.state;
      if(!title || !description || !apartmentId){
          
          this.setState({message:"Wszystkie pola muszą być wypełnione."});
          return false;
      }
      else if(title.length < 10){
          this.setState({message:"Tytuł musi mieć co najmniej 10 znaków"});
          return false;
      }
      else if(description.length < 20){
          this.setState({message:"Opis musi mieć co najmniej 20 znaków"});
          return false;
      }
      else{
          //poprawny formularz
          return true;
      }
  
    }

    pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

     
    if (!result.cancelled) {
      const item=this.state.uriList.find(u=>u.uri===result.uri);
      if (!item)  this.setState({uriList:[...this.state.uriList,result]});
     
       
    }
   
  };
      
  renderImage = ({ item }) => {
  
    return (
      <View>
          <Image source={{uri: item.uri}} style={{height:100, width:100, resizeMode:"cover"}}
          />
          <Button
              mode="contained"
              compact={true}
              uppercase={false}
              labelStyle={styles.xButtonText}
              style={{position:"absolute",backgroundColor:colors.white,alignItems:"center"}}
              onPress={()=>this.handleXPress(item)}
             >X</Button>
      </View>
      
    );
  };
  handleXPress=(item)=> {
    console.log(item)
    const newList=this.state.uriList.filter(u=>u.uri!=item.uri);
    this.setState({uriList:newList});
  }

  handleAddButton = () => {
  this.setState({message:""});
    const isValid=this.validate();
    const {title,description,apartment}=this.state;
    if(isValid === true){
      this.setState({isLoading:true});
      addFailure({
          title: title,
          description: description,
          apartmentId: apartment.id
      }).then(
        () => {

          this.props.navigation.goBack();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({isLoading:false,message:resMessage});

        }
      );
    }
  };

  onChangeApartment (apartment) {
  
    this.setState({apartment:apartment,apartmentName: `${apartment.type} nr ${apartment.number}, ${apartment.propertyAddress.address}`,apartmentDialogVisible:false });
  };


  getApartmentsList = ()=> {
   
    sharesService.getUserShareSubjects().then((res) => {
      this.setState({apartments:res.data})
    },(error) => {
          
    }
  ).catch(e => { });

  };
  componentDidMount() {
    this.getApartmentsList();
  }

  hideApartmentDialog=()=> {
    this.setState({apartmentDialogVisible:false});
  };

  openApartmentDialog=()=>{
    this.setState({apartmentDialogVisible:true});
  }

  
  renderApartmentDialog = ({ item }) => {
 
    return (
     
      <List.Item  onPress={()=>this.onChangeApartment(item)} 
       bottomDivider
       title=  {`${item.type} nr ${item.number}, ${item.propertyAddress.address}` }/>
      
    );
  };
  

  
  render() {
    const{uri}=this.state;
    const {title,description}=this.state;
    
    return (
      <ScrollView style={{margin:10}}>   
          
          {/* <TextField
              required
              fullWidth
              select
              label="Mieszkanie"
              onChange={this.onChangeApartment}
            >
              {this.state.apartments.map((apartment) => (
                <MenuItem key={apartment.id} value={apartment.id}>
                 {`${apartment.type} nr ${apartment.number}, ${apartment.propertyAddress.address}` }
                </MenuItem>
              ))}
          </TextField> */}
         
          <Text style={{margin:5}}>Mieszkanie : </Text>
          <Button
            mode="text"
            labelStyle={styles.TransparentButtonText}
            compact={true}
            uppercase={false}
            onPress={this.openApartmentDialog}
            >{this.state.apartment==='' ? (" Wybierz mieszkanie ") : ( this.state.apartmentName + "  ") }
              <Image style={{width:10,height:10,alignSelf:"center"}} source={require('../../assets/icons/down-arrow.png')} />
          </Button>
         

          {/* <View style={{flexDirection:"row"}}>
            <Text>Rodzaj zgłoszenia : </Text>
          <Button
            mode="text"
            labelStyle={styles.TransparentButtonText}
            compact={true}
            uppercase={false}
            style={{minWidth:100}}
            onPress={this.openApartmentDialog}
            >{this.state.apartment==='' ? (" Wybierz ") : ( this.state.apartment + "  ") }
              <Image style={{width:10,height:10,alignSelf:"center"}} source={require('../../assets/icons/down-arrow.png')} />
          </Button>
          </View> */}

          <TextInput
            label="Tytuł zgłoszenia"
            value={title}
            style={{backgroundColor:colors.lightWhite}}
           onChangeText={(title) => this.setState({ title})}/> 
            <TextInput
              label="Treść zgłoszenia"
              multiline
              style={{height:350,backgroundColor:colors.lightWhite}}
              value={description}
              onChangeText={(description) => this.setState({description})}
            /> 
 
            <View>
            <FlatList horizontal={true}
                 data={this.state.uriList}
                 keyExtractor={(a) => a.uri}
                renderItem={this.renderImage}
              />
              
         
            </View>
           
             <Button
              mode="text"
              compact={true}
              uppercase={false}
              labelStyle={styles.TransparentButtonText}
              onPress={this.pickImage}
             >Załaduj plik</Button>
            
            <Text style={{color:'red'}}>{this.state.message}</Text>
            <Button
            loading={this.state.isLoading}
            title="WYŚLIJ ZGŁOSZENIE"
            containerStyle={{ flex: -1 }}
            titleStyle={{fontSize:13}}
            onPress={this.handleAddButton}
            disabled={this.state.isLoading}
            buttonStyle={{backgroundColor:'grey'}}

            
            />



<       Portal>
          <Dialog visible={this.state.apartmentDialogVisible} onDismiss={this.hideApartmentDialog}>
            <Dialog.Title>Wybierz mieszkanie</Dialog.Title>
          <Dialog.Content>
              <Divider/>
              <FlatList
                data={this.state.apartments}
                keyExtractor={(a) => a.id}
                renderItem={this.renderApartmentDialog}
              />
          </Dialog.Content>
          </Dialog>
        </Portal>  
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  TransparentButtonText: {
    color: 'black',
    fontSize: 15,
    
  },
  xButtonText: {
    color: colors.button,
    alignSelf:"center",
    fontSize:12
   
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