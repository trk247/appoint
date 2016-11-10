'use strict';

import React, { Component } from 'react';
import { Image, Navigator } from 'react-native';
import { connect } from 'react-redux';

import { popRoute } from '../../actions/route';
import { replaceRoute } from '../../actions/route';

import {Container, Header, Title, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';

import theme from '../../themes/base-theme';
import styles from './styles';

class ForgotPassword extends Component {


  constructor(props) {
    super(props);
    this.state = {
      email: '',
      result: ''
    };
  }

  navigateTo(route) {
      this.props.replaceOrPushRoute(route);
  }
  
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };;
  
  forgotPassword() {
    
    let {email,password, firstName, lastName, medicalId} = this.state;
    let error = '';

    if (!this.validateEmail(email)) {
      error = "Please enter in a valid email.\n";
    }

    if (error == '') {
      this.setState({result: 'further'});
      // fetch('http://www.appointshare.com/forgot_password', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     email: email
      //   })
      // })
      // .then((response) => response.json())
      // .then((responseData) => {
      //   
      //   if (responseData == 'email_invalid') {
      //     alert('Invalid Email');
      //     
      //   } else{
      //     alert(responseData, 'Success');
      //     // console.log(responseData);
      //    this.popRoute();
      //   }
      // })
      // .catch((error) => {
      //   console.warn(error);
      // })
      // .done();
    } else {
      this.setState({result: error});
    }

  }
    
    steps() {
      switch (this.state.step) {
        case 1:
          return (<Step1 />)
      }
    }
    
    popRoute() {
        this.props.popRoute();
    }
    
    getResultMessage() {
      console.log('++'+this.state.result);
      if (this.state.result == 'further')  {
        console.log('---');
        return (<Text>Check your email to continue.</Text>);
      } else if (this.state.result != '')  {
        return (<Text style={styles.feedback}>{this.state.result}</Text>);
      } else {
        return null;
      }
    }
    
    render() {
        return (
            <Container theme={theme} style={{backgroundColor:'#384850'}}>
                <Image source={require('../../../images/glow2.png')} style={styles.container} >
                    <Header>
                        <Button transparent onPress={() => this.popRoute()}>
                            <Icon name='ios-arrow-back' style={{fontSize: 30, lineHeight: 32}} />
                        </Button>

                        <Title>Forgot Password</Title>
                    </Header>

                    <Content padder style={{backgroundColor: 'transparent'}}>
                        <View padder>
                        

                            <View style={styles.mb25}>
                  
                                <Text style={styles.text}>Enter in your Email to receive your code to reset your password.</Text>
                                {this.getResultMessage()}
                                <View style={styles.mb25}>
                                    <InputGroup>
                                        <Icon name='ios-mail' />
                                        <Input placeholder='Email' 
                                        onChangeText={(text) => this.setState({email  : text})}/>
                                    </InputGroup>
                                </View>
                              
                            </View>

                            <Button rounded block style={{backgroundColor: '#fff', marginTop: 10}} 
                            textStyle={{color: '#00c497'}}
                            onPress={() => this.forgotPassword()}
                            >
                                Reset Password
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

export default connect(null, bindAction)(ForgotPassword);
