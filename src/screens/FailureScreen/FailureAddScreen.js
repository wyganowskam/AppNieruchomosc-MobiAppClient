import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import TextField from '@material-ui/core/TextField';
import * as ImagePicker from 'expo-image-picker';
import {failureList} from './failureData';
import {getUserInfo} from '../../services/authService';
import colors from '../../config/colors';
import { Button, Image,Text} from 'react-native-paper';
import {addFailure} from '../../services/failureService';
import MenuItem from '@material-ui/core/MenuItem';
export default class FailureAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
        isLoading:false,
        title:'',
        description:'',
        apartmentId:'',
        apartments:[],
        message:'',
        uriList:[]
    }
   this.pickImage=this.pickImage.bind(this);
   this.renderImage=this.renderImage.bind(this);
   this.validate=this.validate.bind(this);
   this.handleAddButton=this.handleAddButton.bind(this);
   this.getApartmentsList=this.getApartmentsList.bind(this);
   this.onChangeApartment=this.onChangeApartment.bind(this);
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
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
   
    if (!result.cancelled) {
       this.setState({uriList:[...this.state.uriList,result]});
    }
   // console.log(result);
  };
      
  renderImage = ({ item }) => {
   
    return (
      <View>
          <Image source={{uri: item.uri}} style={{height:100, width:100, resizeMode:"cover"}}/>
      </View>
      
    );
  };

  handleAddButton = () => {
  this.setState({message:""});
    const isValid=this.validate();
    const {title,description,apartmentId}=this.state;
    if(isValid === true){
      this.setState({isLoading:true});
      addFailure({
          title: title,
          description: description,
          apartmentId: apartmentId
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

  onChangeApartment = e => {
    const val = e.target.value;
    this.setState({apartmentId:val});
  };


  getApartmentsList = ()=> {
   
    getUserInfo().then(
      (res) => {
        //console.log(res);
        if(res.status === 200){
          //udało się zdobyć informacje o użytkowniku
         this.setState({apartments :res.data.apartments});
       
        }
      }
    );
  };
  componentDidMount() {
    this.getApartmentsList();
  }

  
  render() {
    const{uri}=this.state;
    const {title,description}=this.state;
    
    return (
      <ScrollView>   
          <TextInput
            label="Tytuł zgłoszenia"
            value={title}
           onChangeText={(title) => this.setState({ title})}/> 
          <TextField
              required
              fullWidth
              select
              label="Mieszkanie"
              onChange={this.onChangeApartment}
            >
              {this.state.apartments.map((apartment) => (
                <MenuItem key={apartment.id} value={apartment.id}>
                  {apartment.address}
                </MenuItem>
              ))}
          </TextField>
            <TextInput
              label="Treść zgłoszenia"
              multiline
              style={{height:450}}
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
           
             {/*<Button
              title="Załaduj plik"
              titleStyle={styles.TransparentButtonText}
              containerStyle={{ flex: -1 }}
              buttonStyle={{ backgroundColor: 'transparent' ,alignSelf:"flex-start"}}
              underlayColor="transparent"
              onPress={this.pickImage}
             />
             */}
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
   
    fontSize: 12,
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