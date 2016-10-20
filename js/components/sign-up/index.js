'use strict';

import React, { Component } from 'react';
import { Image, Navigator } from 'react-native';
import { connect } from 'react-redux';

import { popRoute } from '../../actions/route';
import { replaceRoute } from '../../actions/route';

import {Container, Header, Title, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';

import theme from '../../themes/base-theme';
import styles from './styles';

class SignUp extends Component {


  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      medicalId: '',
      result: ''
    };
  }

  navigateTo(route) {
      // this.props.closeDrawer();
      this.props.replaceOrPushRoute(route);
  }

  signUp() {
    
    let {email,password, firstName, lastName, medicalId} = this.state;
    let error = '';

    if (email == '') {
      error = "Please enter in a valid email.\n";
    }
    if (password == '') {
      error += "Please enter in a password.\n";
    }

    if (firstName == '') {
      error += "Please enter in your First Name.\n";
    }
    if (lastName == '') {
      error += "Please enter in your Last Name.\n";
    }


    if (error == '') {

      fetch('http://www.appointshare.com/signup.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          medicalId: medicalId
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        
        if (responseData == 'email_in_use') {
          alert('Email already exists');
          
        } else{
        alert(responseData, 'Success');
        // console.log(responseData);
    
         this.popRoute();
        }
      })
      .catch((error) => {
        console.warn(error);
      })
      .done();
    } else {
      this.setState({result: error});
    }

  }


    popRoute() {
        this.props.popRoute();
    }

    render() {
        return (
            <Container theme={theme} style={{backgroundColor:'#384850'}}>
                <Image source={require('../../../images/glow2.png')} style={styles.container} >
                    <Header>
                        <Button transparent onPress={() => this.popRoute()}>
                            <Icon name='ios-arrow-back' style={{fontSize: 30, lineHeight: 32}} />
                        </Button>

                        <Title>SignUp</Title>
                    </Header>

                    <Content padder style={{backgroundColor: 'transparent'}}>
                        <View padder>
                        <Text style={styles.feedback}>{this.state.result}</Text>
                            <View style={styles.mb25}>
                                <InputGroup>
                                    <Icon name='ios-person' />
                                    <Input placeholder='First Name' 
                                    onChangeText={(text) => this.setState({firstName  : text})}/>
                                </InputGroup>
                            </View>

                            <View style={styles.mb25}>
                                <InputGroup>
                                    <Icon name='ios-person' />
                                    <Input placeholder='Last Name' 
                                    onChangeText={(text) => this.setState({lastName  : text})}/>
                                </InputGroup>
                            </View>
                            
                            <View style={styles.mb25}>
                                <InputGroup>
                                    <Icon name='ios-mail-open-outline' />
                                    <Input placeholder='Email'
                                    onChangeText={(text) => this.setState({email  : text})}
                                     />
                                </InputGroup>
                            </View>

                            <View style={styles.mb25}>
                                <InputGroup>
                                    <Icon name='ios-unlock-outline' />
                                    <Input
                                        placeholder='Password'
                                        secureTextEntry={true}
                                        onChangeText={(text) => this.setState({password  : text})}
                                    />
                                </InputGroup>
                            </View>

                            <View style={styles.mb25}>
                              <InputGroup style={styles.input}>
                                <Icon name='ios-medkit' />

                                <Input
                                    placeholder='MEDICAL ID'
                                    secureTextEntry={false}
                                    onChangeText={(text) => this.setState({medicalId  : text})}
                                />
                            </InputGroup>
                            </View>


                            <Button rounded block style={{backgroundColor: '#fff', marginTop: 20}} 
                            textStyle={{color: '#00c497'}}
                            onPress={() => this.signUp()}
                            >
                                Sign Up
                            </Button>
                        </View>
                    </Content>
                </Image>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(SignUp);
