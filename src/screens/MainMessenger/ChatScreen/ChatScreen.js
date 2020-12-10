import React, { Component } from 'react';
import { View,  TouchableWithoutFeedback,Keyboard } from 'react-native';
import styles from "./styles";
import { TextInput,IconButton } from 'react-native-paper';

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    };

    dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    render() {
        return (

            <View style={{ flex: 1 }}>
                 <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
                <View style={{ flex: 1 }} >


                    
                </View>
                </TouchableWithoutFeedback>
                <View style={styles.container} >
                <TextInput
                    label="Nowa wiadomość"
                    value={this.state.text}
                    style={styles.input}
                    onChangeText={text => {this.setState({ text }) }}
                    multiline
                />
                <IconButton
                    icon="send"
                  //  color={black}
                    size={20}
                    onPress={() => console.log('Pressed')}
                />
                </View>
                
            </View>
        );
    }
}