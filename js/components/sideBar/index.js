'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, Platform } from 'react-native';
import { closeDrawer } from '../../actions/drawer';
import { replaceOrPushRoute } from '../../actions/route';

import { Text, Icon, List, ListItem, Content, Thumbnail, Badge } from 'native-base';

import styles from './style';

class SideBar extends Component {
  constructor(props) {
      super(props);
      
      this.state = {
      
          number: ''
        
        
      };
      AsyncStorage.getItem("@uid:key").then((value) => {
          this.setState({uid: JSON.parse(value)});
      }).done();
      console.log('uid: ' + this.state.uid);
      
      this.getUpcomingAppts();
  }


    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }
// <Thumbnail size={200} style={{alignSelf: 'center', marginTop: 20, marginBottom: 15, resizeMode: 'contain'}} circular source={require('../../../images/icon2.png')} />
  getUpcomingAppts() {
    // need userId
    let { number } = this.state;
    fetch('http://www.appointshare.com/getUpcomingAppointmentsCount.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
        
        if (responseData > '0') {
          // console.log('num: ' + responseData);
          this.setState({number: String(responseData)});
        // alert(this.state.number);
        }
    })
  
  }
  
  
  renderForAnroidHack() {
  console.log(Platform.OS);
    if (Platform.OS === 'android') {
      console.log('android');
      return (       <ListItem button onPress={() => this.navigateTo('logout')} iconLeft style={styles.links} >
          
          <Text ></Text>
      </ListItem>   );
      
    }

  }
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
                          <Badge>{this.state.number}</Badge>
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
                    <ListItem button onPress={() => this.navigateTo('login')} iconLeft style={styles.links} >
                        <Icon name='ios-power' />
                        <Text >Logout</Text>
                    </ListItem>  
                    
                        {this.renderForAnroidHack()}
                    
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
