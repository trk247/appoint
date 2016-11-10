'use strict';

import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';

import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';

import { Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, View, Footer } from 'native-base';
import FooterComponent from './../footer';
import theme from '../../themes/base-theme';
import styles from './styles';

class News extends Component {
  constructor(props) {
      super(props);
      this.state = {
        content: ''
      };
      this.getContent();
  }
    popRoute() {
        this.props.popRoute();
    }
    getContent() {

      fetch('http://app.appointshare.com/remote_content', {
  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: 'news',
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({content: responseData})
        
      });
    }
    render() {
        return (
            <Container theme={theme} style={{backgroundColor: '#384850'}}>
                <Image source={require('../../../images/glow2.png')} style={styles.container} >
                    <Header>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name='ios-menu' style={{fontSize: 30, lineHeight: 32}} />
                    </Button>

                        <Title>News</Title>

                        
                    </Header>

                    <Content padder style={{backgroundColor: 'transparent'}}>
                        <View>
                        <Text>{this.state.content}</Text>
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

export default connect(null, bindAction)(News);
