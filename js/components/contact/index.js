'use strict';

import React, { Component } from 'react';
import { Image, TextInput, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';

import {Footer,  Container, Content, Header, Title, Button, TextArea, InputGroup, Input, Icon, View, Tabs } from 'native-base';
import FooterComponent from './../footer';
import theme from '../../themes/base-theme';
import styles from './styles';
// import login from './login-theme';

class Contacts extends Component {
  constructor(props) {
      super(props);
      this.state = {
          text: '',
          uid: '',
          message: '',
          result: ''
      };
      
      AsyncStorage.getItem("@uid:key").then((value) => {
          this.setState({uid: JSON.parse(value)});
      }).done();
  }
    popRoute() {
        this.props.popRoute();
    }
    
    renderFeedback () {
        if (this.state.result === 'Please enter in a message.') {
            return (
              <View style={styles.viewFeedback}>
              <Text style={styles.feedback}>{this.state.result}</Text>
              </View>
            );
        } else {
            if (this.state.result === 'Your message has been received.') {
              return (<View style={styles.viewGreenFeedback}>
              <Text style={styles.greenFeedback}>{this.state.result}</Text>
              </View>);
            } else {
              return null;
            }
        }
    }

    sendMessage() {
      
      let {message, text, uid} = this.state;
      let errors = '';
    
      if (text == '') {
        errors = 'Please enter in a message';
      }
      
      if (errors == '') {
      
      fetch('http://app.appointshare.com/remote_contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: uid,
          text: text
          
        })
      })
      .then((response) => response.json())
      .then((responseData) => {

        console.log(responseData[0]);
        if (responseData[0] == 'success') {
          
          this.setState({result: 'Your message has been received.'});
          
        } else {
        
          this.setState({result: 'Please enter a message.'});
      
      

        }
      })
      .catch((error) => {
        console.warn(error);
      })
      .done();
    
  } else {
    this.setState({result: 'Please enter a message.'});
  }
}

    render() {
        return (
          
          <Container theme={theme} style={{backgroundColor: '#384850'}}>
              <Image source={require('../../../images/glow2.png')} style={styles.container} >
              <Header>
              <Button transparent onPress={this.props.openDrawer} >
                  <Icon name='ios-menu' style={{fontSize: 30, lineHeight: 32}} />
              </Button>

                  <Title>Contact Us</Title>

                  
              </Header>
              <Content>
  <View>
  {this.renderFeedback()}
  <Text style={styles.text}>Fill out the form to contact us.</Text>
              <InputGroup borderType="rounded" style={styles.input}>
                    <Input
        style={styles.textarea}
        onChangeText={(text) => this.setState({text})}
        multiline={true}
        autofocus={true}
        value={this.state.text}
      
      />
      </InputGroup>
      <Button rounded block style={{backgroundColor: '#fff', marginTop: 20}} 
      textStyle={{color: '#00c497'}}
      onPress={() => this.sendMessage()}
      >
          Submit
      </Button>
                    </View>
                    </Content>
                    <Footer style={{borderTopWidth: 0}}>
                        <FooterComponent navigator={this.props.navigator} />
                    </Footer>
                </Image>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(Contacts);
