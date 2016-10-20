'use strict';

import React, { Component } from 'react';
import { Image, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';

import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';

import { Container, Content, Header, Title, Button, TextArea, InputGroup, Input, Icon, View, Tabs } from 'native-base';

import theme from '../../themes/base-theme';
import styles from './styles';
// import login from './login-theme';

class Contacts extends Component {
  constructor(props) {
      super(props);
      this.state = {
          text: ''
      };
  }
    popRoute() {
        this.props.popRoute();
    }

    render() {
        return (
          
          <Container theme={theme} style={{backgroundColor: '#384850'}}>
              <Image source={require('../../../images/glow2.png')} style={styles.container} >
              <Header>
                  <Button transparent> </Button>

                  <Title>Contact Us</Title>

                  <Button transparent onPress={this.props.openDrawer} >
                      <Icon name='ios-menu' style={{fontSize: 30, lineHeight: 32}} />
                  </Button>
              </Header>
              <Content>
  <View>
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
      // onPress={() => this.signUp()}
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
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(Contacts);
