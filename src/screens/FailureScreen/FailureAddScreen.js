import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ScrollView ,Image, Platform} from 'react-native';
import { TextInput } from 'react-native-paper';
import TextField from '@material-ui/core/TextField';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../config/colors';
import { Button,Text,Dialog, Portal,List, Divider } from 'react-native-paper';
import {addFailure,getTypes} from '../../services/failureService';
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
        type:'',
        types:[],
        apartmentDialogVisible:false,
        typeDialogVisible:false,
        picture:undefined
    }
   this.pickImage=this.pickImage.bind(this);
   this.renderImage=this.renderImage.bind(this);
   this.validate=this.validate.bind(this);
   this.handleAddButton=this.handleAddButton.bind(this);
   this.getApartmentsList=this.getApartmentsList.bind(this);
   this.onChangeApartment=this.onChangeApartment.bind(this);
   this.onChangeType=this.onChangeType.bind(this);
   this.hideApartmentDialog=this.hideApartmentDialog.bind(this);
   this.hideTypeDialog=this.hideTypeDialog.bind(this);
   this.handleXPress=this.handleXPress.bind(this);
   this.openApartmentDialog=this.openApartmentDialog.bind(this);
   this.openTypeDialog=this.openTypeDialog.bind(this);
   this.getAllTypes=this.getAllTypes.bind(this);

   this.getAllTypes();
    }

    getAllTypes=()=> {
     
      getTypes().then((res) => {
        // console.log(res.data)
        this.setState({ types: res.data});
      },(error) => {
            
      }
    ).catch(e => { });
    }

    validate= () => {
      const {title,description,apartment,type}=this.state;
      if(!title || !description || !type ){
          
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
      //const item=this.state.uriList.find(u=>u.uri===result.uri);
      //if (!item)  this.setState({uriList:[...this.state.uriList,result],message:""});
      this.setState({picture: [result],message:""});
       
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
    //console.log(item)
    //const newList=this.state.uriList.filter(u=>u.uri!=item.uri);
    //this.setState({uriList:newList,message:""});
    this.setState({picture:[]})
  }

  handleAddButton = () => {
  this.setState({message:""});
    const isValid=this.validate();
    const {title,description,apartment,type}=this.state;
   
    if(isValid === true){
      this.setState({isLoading:true});
     
      const formData = new FormData();

      formData.append('title', title);
      formData.append('description', description);
      if (apartment) formData.append('shareSubjectId', apartment.id);
      formData.append('typeId', type.id);
      if (this.state.picture && this.state.picture.length > 0){
        //DODANIE ZDJĘCIA
        const name=picture.uri.split('/').pop();
        const picture=this.state.picture[0];
        formData.append('picture', {
          uri: Platform.OS==="android"? picture.uri : picture.uri.replace("file://",""),
          name: name,
          type:'image/jpg',
        })
      }
     
      addFailure(formData).then(
        () => {

          // this.props.navigation.goBack();
          this.props.navigation.reset({
            index: 1,
            routes: [{ name: 'Main' }, {name:'Failure'}],
          });
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

  onChangeType (type) {
  
    this.setState({type:type,typeDialogVisible:false,message:"" });
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
    this.setState({apartmentDialogVisible:false,message:""});
  };

  openApartmentDialog=()=>{
    this.setState({apartmentDialogVisible:true,message:""});
  }
  hideTypeDialog=()=> {
    this.setState({typeDialogVisible:false,message:""});
  };

  openTypeDialog=()=>{
    this.setState({typeDialogVisible:true,message:""});
  }

  
  renderApartmentDialog = ({ item }) => {
 
    return (
     
      <List.Item  onPress={()=>this.onChangeApartment(item)} 
       bottomDivider
       title=  {`${item.type} nr ${item.number}, ${item.propertyAddress.address}` }/>
      
    );
  };

  renderTypeDialog = ({ item }) => {
 
    return (
     <>
      <List.Item  onPress={()=>this.onChangeType(item)} 
       bottomDivider
       title={item.title}
       titleStyle={{flexWrap:"wrap"}}
       titleNumberOfLines={3}
       />
       <Divider/>
      </>
    );
  };
  

  
  render() {
    const{uri}=this.state;
    const {title,description}=this.state;
    
    return (
      <ScrollView style={{margin:10}}>   
          
         
         
         

          <Button
            mode="text"
            labelStyle={styles.TransparentButtonText}
            compact={true}
            uppercase={false}
            onPress={this.openTypeDialog}
            style={{margin:5}}
            >{this.state.type==='' ? (" Wybierz typ zgłoszenia ") : ( this.state.type.title + "  ") }
              <Image style={{width:10,height:10,alignSelf:"center"}} source={require('../../assets/icons/down-arrow.png')} />
          </Button>

          <Button
            mode="text"
            labelStyle={styles.TransparentButtonText}
            compact={true}
            uppercase={false}
            onPress={this.openApartmentDialog}
            style={{margin:5}}
            >{this.state.apartment==='' ? (" Wybierz lokal (jeśli dotyczy) ") : ( this.state.apartmentName + "  ") }
              <Image style={{width:10,height:10,alignSelf:"center"}} source={require('../../assets/icons/down-arrow.png')} />
          </Button>

          <TextInput
            label="Tytuł zgłoszenia"
            value={title}
            style={{backgroundColor:colors.lightWhite}}
           onChangeText={(title) => this.setState({ title,message:""})}/> 
            <TextInput
              label="Treść zgłoszenia"
              multiline
              style={{height:250,backgroundColor:colors.lightWhite}}
              value={description}
              onChangeText={(description) => this.setState({description,message:""})}
            /> 
 
            <View>
            <FlatList horizontal={true}
                 data={this.state.picture}
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
            
            <Text style={{color:colors.error,alignSelf:"center"}}>{this.state.message}</Text>
            <Button
            loading={this.state.isLoading}
            compact={true}
              uppercase={false}
            labelStyle={{fontSize:13,color:colors.white}}
            onPress={this.handleAddButton}
            disabled={this.state.isLoading}
            style={{backgroundColor:colors.button,margin:10}}>
              WYŚLIJ ZGŁOSZENIE
            </Button>



        <Portal>
          <Dialog visible={this.state.apartmentDialogVisible} onDismiss={this.hideApartmentDialog} style={{maxHeight:600}}>
            <Dialog.Title>Wybierz mieszkanie</Dialog.Title>
            <Dialog.Content >
              <Divider/>
              <FlatList
                data={this.state.apartments}
                keyExtractor={(a) => a.id}
                renderItem={this.renderApartmentDialog}
                style={{maxHeight:500}}
              />
          </Dialog.Content>
          </Dialog>
        </Portal>

        <Portal>
          <Dialog visible={this.state.typeDialogVisible} onDismiss={this.hideTypeDialog} style={{maxHeight:600}}>
            <Dialog.Title>Wybierz typ zgłoszenia</Dialog.Title>
            <Dialog.Content>
             
              <Divider/>
             
              <FlatList
                data={this.state.types}
                keyExtractor={(a) => a.id}
                renderItem={this.renderTypeDialog}
                style={{maxHeight:500}}
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