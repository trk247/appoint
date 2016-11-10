'use strict';

import React, { Component } from 'react';
import { Image, Platform, AsyncStorage, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { pushNewRoute, replaceRoute } from '../../actions/route';
import { Container, Content, Text, TextInput, InputGroup, Input, Button, List, Icon, View, ListItem } from 'native-base';
  
import login from './login-theme';
import styles from './styles';
import OneSignal from 'react-native-onesignal';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scroll: false,
            email: '',
            password: '',
            result: '',
            userId: '',
            pushToken: ''
        };
        
        // one signal tokens
        AsyncStorage.getItem("@UserId:key").then((value) => {
            this.setState({userId: JSON.parse(value)});
        }).done();

        AsyncStorage.getItem("@pushToken:key").then((value) => {
            this.setState({pushToken: JSON.parse(value)});
        }).done();      
    }
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };;
    signIn() {
      
      let { email, password, userId, pushToken } = this.state;
      let errors = '';

      if (!this.validateEmail(email)) {
        errors = "\u2022 Please enter in a valid email.\n";
      }

      if (password == '') {
        errors += "\u2022 Please enter in a valid password."
      }
      
      if (errors != '') {
        this.setState({result: errors});
      } else {

        fetch('http://app.appointshare.com/remote_login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            os_userId : userId,
            os_pushToken: pushToken
          })
        })
        .then((response) => response.json())
        .then((responseData) => {

          // console.log(responseData);
          if (responseData[0].status == 'success') {
            
            try {
              AsyncStorage.setItem('@uid:key', responseData[0].id);
                console.log('settings' + responseData[0].id);
              }  catch (error) {
                console.log('settings error' + error);
              }
              this.replaceRoute('home');
            } else if (responseData[0].status == 'success appts') {
              this.replaceRoute('overview');
          } else {
            this.setState({result: 'Email or Password is incorrect'});
          }
        })
        .catch((error) => {
          console.warn(error);
        })
        .done();
      }

    }
    
    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }

    renderFeedback () {
        if (this.state.result) {
            return (
              <View style={styles.viewFeedback}>
              <Text style={styles.feedback}>{this.state.result}</Text>
              </View>
            );
        } else {
            // return null;
            return (
              <View style={styles.viewFeedbackHidden}>
              <Text style={styles.feedback}>{this.state.result}</Text>
              </View>
            )
        }
    }

    // <View style={styles.checkBoxStyle}>
    //   <ItemCheckbox // https://www.npmjs.com/package/react-native-item-checkbox
    //     color="#0097d6"
    //     checked={true}
    //     size={20}
    //     label="Remember Me"
    //     onChange={(checked) => this.setState({checked})}
    //   />
    //   <Text>Remember Me</Text>
    // </View>
    render() {

        let screenHeight = Dimensions.get("window").height;
        return (
            <Container style={{height: screenHeight, backgroundColor: '#0097d6'}}>
            <ScrollView>
                <Content style={{backgroundColor: '#fff'}} theme={login} scrollEnabled={this.state.scroll}>
                    <Image source={require('../../../images/glow2.png')} style={styles.container}>
                        <Image style={styles.shadow} source={require('../../../images/logo.png')} >                    
                            <View style={styles.bg}>
                            {this.renderFeedback()}
                                <View style={{marginBottom: 20, marginTop: 0}}>
                                    <InputGroup >
                                        <Icon name='ios-person' />
                                        <Input
                                            placeholder='EMAIL'
                                            onChangeText={(email) => this.setState({email})}
                                        />
                                    </InputGroup>
                                </View>
                                <View style={{marginBottom: 10}}>
                                    <InputGroup >
                                        <Icon name='ios-unlock-outline' />
                                        <Input
                                            placeholder='PASSWORD'
                                            secureTextEntry={true}
                                            onChangeText={(password) => this.setState({password})}
                                        />
                                    </InputGroup>
                                </View>    
                                <Button transparent style={{alignSelf: 'flex-end',  marginBottom: (Platform.OS === 'ios' ) ? 5 : 0, marginTop: (Platform.OS === 'ios' ) ? -10 : 0}}
                                onPress={() => this.pushNewRoute('forgotPassword')}>
                                    <Text>
                                        Forgot Password
                                    </Text>
                                </Button>
                                
                                <Button rounded block style={{marginBottom: 20}} 
                                // onPress={() => this.replaceRoute('home', {email: this.state.email, password: this.state.password})}
                                 onPress={() => this.signIn()}
                                >
                                    Login
                                </Button>
                                <Button transparent style={{alignSelf: 'center'}} 
                                onPress={() => this.pushNewRoute('signUp')}>
                                    <Text>
                                        Sign Up Here
                                    </Text>
                                </Button>
                            </View>
                        </Image>
                    </Image>
                  </Content>
                </ScrollView>
            </Container>)
    }
}

function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null, bindActions)(Login);