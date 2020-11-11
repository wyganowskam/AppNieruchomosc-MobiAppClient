import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {failureList} from './failureData';
import colors from '../../config/colors';
import { Button, Image} from 'react-native-elements';
const noImage={uri: "https://jenmulligandesign.com/wp-content/uploads/2017/04/gratisography-free-stock-photos.jpg"};

export default class FailureAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
        title:'',
        description:'',
        uriList:[]
    }
   this.pickImage=this.pickImage.bind(this);
   this.renderImage=this.renderImage.bind(this);
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
    console.log(result);
  };
      
  renderImage = ({ item }) => {
   
    return (
      <View>
          <Image source={{uri: item.uri}} style={{height:100, width:100, resizeMode:"cover"}}/>
      </View>
      
    );
  };

  
  render() {
    const{uri}=this.state;
    const {title,description}=this.state;
    
    return (
      <View>   
          <TextInput
            label="Tytuł zgłoszenia"
            value={title}
           onChangeText={(title) => this.setState({ title})}/> 
            <TextInput
              label="Treść zgłoszenia"
              multiline
              style={{height:400}}
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
              title="Załaduj plik"
              titleStyle={styles.TransparentButtonText}
              containerStyle={{ flex: -1 }}
              buttonStyle={{ backgroundColor: 'transparent' ,alignSelf:"flex-start"}}
              underlayColor="transparent"
              onPress={this.pickImage}
             />
            <Button
            //loading={isLoading}
            title="WYŚLIJ ZGŁOSZENIE"
            containerStyle={{ flex: -1 }}
            
            titleStyle={{fontSize:13}}
           // onPress={this.handleAddButton}
           // disabled={isLoading}
            buttonStyle={{backgroundColor:'grey'}}

            
            />
      </View>
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