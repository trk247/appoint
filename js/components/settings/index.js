'use strict';

import React, { Component } from 'react';
import { Image, TextInput, AppRegistry, TouchableHighlight, TouchableButton, TouchableOpacity, AsyncStorage  } from 'react-native';
import { connect } from 'react-redux';

import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';

import { Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, View, Footer } from 'native-base';

import theme from '../../themes/base-theme';
import styles from './styles';
var moment = require('moment');
import FooterComponent from './../footer';
import ModalPicker from 'react-native-modal-picker';
var CalendarPicker = require('react-native-calendar-picker'), CalendarPicker2;

class Settings extends Component {
  setNativeProps(nativeProps) {
    this.refs['root'].setNativeProps(nativeProps);
  }
  
  constructor(props) {
      super(props);
      this.state = {
        timeDate: moment().add(30 - moment(new Date()).minutes() % 30, 'minutes'),
        date: new Date(),
        uid: ''
      }
      
      AsyncStorage.getItem("@uid:key").then((value) => {
        this.setState({uid: value});
      }).done();
      
  }
  
  onSubmit() {
    let {timeDate, date, uid} = this.state;
    fetch('http://app.appointshare.com/schedule_appointments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: date.toString().substr(4,12),
        timeDate: moment(timeDate).format('hh:mm') + ' ' + moment(timeDate).format('A'),
        uid: uid
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      // console.log(responseData);
      if (responseData == 'success') {
        alert('Your scheduling preferences have been updated.');
      } else {
        alert('An server error occured, please try again later.');
      }
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
  }
    
    
    
  
  
  onDateChange (date) {
      this.setState({ date: date });
  }
  
  subtractDay(){
    // if (moment(this.state.date).isSame(new Date, 'day')) return;    // Disable going back with date selection
    this.setState({ timeDate: moment(this.state.timeDate).subtract(1, 'day') });
  }

  addDay(){
    this.setState({ timeDate: moment(this.state.timeDate).add(1, 'day') });
  }

  subtractTime(){
    // if (moment(this.state.date).hour() === 8 && moment(this.state.date).minutes() === 0) return; // Set 8am as minimum time slot
    this.setState({ timeDate: moment(this.state.timeDate).subtract(30, 'minutes') });
  }

  addTime(){
    // if (moment(this.state.date).hour() === 23 && moment(this.state.date).minutes() === 0) return; // Set 11pm as maximum time slot
    this.setState({ timeDate: moment(this.state.timeDate).add(30, 'minutes') });
  }
    popRoute() {
        this.props.popRoute();
    }

    render() {
      let index = 0;
      const data = [
          { key: index++, label: '8 AM' },
          { key: index++, label: '9 AM' },
          { key: index++, label: '10 AM' },
          { key: index++, label: '11 AM' },
          { key: index++, label: '12 AM' },
          { key: index++, label: '1 PM' },
          { key: index++, label: '2 PM' },
          { key: index++, label: '3 PM' },
          { key: index++, label: '4 PM' },
          { key: index++, label: '5 PM' },
      ];
      
      return (
        <Container theme={theme} style={{backgroundColor: '#384850'}}>
            <Image source={require('../../../images/glow2.png')} style={styles.container} >
            <Header>
              <Button transparent onPress={this.props.openDrawer} >
                  <Icon name='ios-menu' style={{fontSize: 30, lineHeight: 32}} />
              </Button>
                <Title>Appointment Request</Title>    
            </Header>
                
            <Content style={{backgroundColor: 'transparent'}}>
              <View >
                <Text style={styles.text}>Schedule an Appointment Request.</Text>
                <View style={styles.rowContainer}>
                  <TouchableOpacity
                    onPress={this.subtractTime.bind(this)}
                    underlayColor="transparent">
                  <Text style={styles.text}>-</Text>
                  </TouchableOpacity>
          
                  <Text style={styles.text}> { moment(this.state.timeDate).format('hh:mm') + ' ' + moment(this.state.timeDate).format('A') } </Text>
                  <TouchableOpacity
                    onPress={this.addTime.bind(this)}
                    underlayColor="transparent">
                      <Text style={styles.text}>+</Text>
                  </TouchableOpacity> 
                </View>
                
                  <Content padder style={{backgroundColor: 'transparent'}} >
                    <CalendarPicker
                      selectedDate={this.state.date}
                      onDateChange={this.onDateChange.bind(this)}
                      textStyle={{color: '#fff'}}
                      selectedDayColor='#00c497'/>
                  <Text style={styles.calendarText}>
                      { this.state.date.toString().substr(4,12) + ' ' + moment(this.state.timeDate).format('hh:mm') + ' ' + moment(this.state.timeDate).format('A') }
                  </Text>
              </Content>  
              <Button rounded block style={{backgroundColor: '#fff', marginTop: 0}} 
                textStyle={{color: '#00c497'}}
                onPress={() => this.onSubmit()}
                >
                      Save
              </Button>                
           </View>
           </Content>
           <Footer style={{borderTopWidth: 0}}>
               <FooterComponent navigator={this.props.navigator} />
           </Footer>
           </Image>
           </Container>
       );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(Settings);