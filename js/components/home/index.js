'use strict';

import React, { Component } from 'react';
import { Image, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { openDrawer } from '../../actions/drawer';
import { popRoute, replaceRoute } from '../../actions/route';

import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Footer } from 'native-base';
import FooterComponent from './../footer';

import theme from '../../themes/base-theme';
import styles from './styles';


import Icon2 from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon2 name="rocket" size={30} color="#900" />)

class Home extends Component {

    constructor(props) {
        super(props);
    
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    popRoute() {
        this.props.popRoute();
    }

    render() {
      
  
        AsyncStorage.getItem("@uid:key").then((value) => {
          console.log(value);
        }).done();
        
      
        return (
            <Container theme={theme} style={{backgroundColor: '#384850'}}>
                <Image source={require('../../../images/glow2.png')} style={styles.container} >
                    <Header>
                        <Button transparent> </Button>

                        <Title>Home</Title>

                        <Button transparent onPress={this.props.openDrawer} >
                            <Icon name='ios-menu' style={{fontSize: 30, lineHeight: 32}} />
                        </Button>
                    </Header>

                    <Content padder style={{backgroundColor: 'transparent'}}>
                        <List>
                            <ListItem iconLeft >
                                <Icon name='ios-pulse'/>
                                
                                <Text>...</Text>
                                
                              
                            </ListItem>
          
                        </List>

          
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
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Home);
