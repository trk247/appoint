'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeDrawer } from '../../actions/drawer';
import { replaceOrPushRoute } from '../../actions/route';

import { Text, Icon, List, ListItem, Content, Thumbnail, Badge } from 'native-base';

import styles from './style';

class SideBar extends Component {

    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }
// <Thumbnail size={200} style={{alignSelf: 'center', marginTop: 20, marginBottom: 15, resizeMode: 'contain'}} circular source={require('../../../images/icon2.png')} />

    render(){
        return (
            <Content style={{backgroundColor: '#252A30'}} >
          <Content style={{top: 40}} >
            
                  <List  foregroundColor={'white'} >
                    <ListItem button onPress={() => this.navigateTo('home')} iconLeft style={styles.links} >
                        <Icon name='ios-home' />
                        <Text >Home</Text>
                    </ListItem>
                    <ListItem button onPress={() => this.navigateTo('appointments')} iconLeft style={styles.links} >
                        <Icon name='ios-calendar-outline' />
                        <Text>Upcoming Appointments</Text>
                    </ListItem>

                    <ListItem button onPress={() => this.navigateTo('previousAppointments')} iconLeft style={styles.links} >
                        <Icon name='ios-medkit' />
                        <Text >Previous Appointments</Text>
                    </ListItem>
                    
                    <ListItem button onPress={() => this.navigateTo('contact')} iconLeft style={styles.links} >
                        <Icon name='ios-paper-outline' />
                        <Text >Contact</Text>
                    </ListItem>  
                                        
                    <ListItem button onPress={() => this.navigateTo('settings')} iconLeft style={styles.links} >
                        <Icon name='ios-settings' />
                        <Text >Settings</Text>
                    </ListItem>  
                                                                              
                    <ListItem button onPress={() => this.navigateTo('Logout')} iconLeft style={styles.links} >
                        <Icon name='ios-power' />
                        <Text >Logout</Text>
                    </ListItem>                      
                    
                </List>
                </Content>
            </Content>
        );
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(SideBar);
