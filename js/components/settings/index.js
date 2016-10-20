'use strict';

import React, { Component } from 'react';
import { Image, TextInput, AppRegistry, TouchableHighlight, TouchableButton, TouchableOpacity  } from 'react-native';
import { connect } from 'react-redux';

import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';

import { Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, View } from 'native-base';

import theme from '../../themes/base-theme';
import styles from './styles';
var moment = require('moment');
// import TimePicker from 'react-native-timepicker';
import ModalPicker from 'react-native-modal-picker';


class Settings extends Component {
  setNativeProps(nativeProps) {
    this.refs['root'].setNativeProps(nativeProps);
  }
  constructor(props) {
      super(props);
      // this.state = {
      //   selectedItem: undefined,
      //     time: 'key0',
      //     results: {
      //           items: []
      //       }
      // };
      this.state = {
  date: moment().add(30 - moment(new Date()).minutes() % 30, 'minutes')
}
  }
  subtractDay(){
    // if (moment(this.state.date).isSame(new Date, 'day')) return;    // Disable going back with date selection
    this.setState({ date: moment(this.state.date).subtract(1, 'day') });
  }

  addDay(){
    this.setState({ date: moment(this.state.date).add(1, 'day') });
  }

  /*
  Time selector buttons
  */
  subtractTime(){
    // if (moment(this.state.date).hour() === 8 && moment(this.state.date).minutes() === 0) return; // Set 8am as minimum time slot
    this.setState({ date: moment(this.state.date).subtract(30, 'minutes') });
  }

  addTime(){
    // if (moment(this.state.date).hour() === 23 && moment(this.state.date).minutes() === 0) return; // Set 11pm as maximum time slot
    this.setState({ date: moment(this.state.date).add(30, 'minutes') });
  }
    popRoute() {
        this.props.popRoute();
    }




    
    render() {
      let index = 0;
      const data = [
          // { key: index++, section: true, label: 'Fruits' },
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
                <Button transparent> </Button>

                <Title>Settings</Title>

                <Button transparent onPress={this.props.openDrawer} >
                    <Icon name='ios-menu' style={{fontSize: 30, lineHeight: 32}} />
                </Button>
            </Header>
                
                <Content style={{backgroundColor: 'transparent'}}>
          
                  
              
            
              
                <View >
                <Text style={styles.text}>Enter your preferred appointment time to recieve notifications when someone cancels.</Text>
         <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={this.subtractTime.bind(this)}
            underlayColor="transparent">
              
                <Text style={styles.text}>-</Text>
              
          </TouchableOpacity>
          
          <Text style={styles.text}> { moment(this.state.date).format('hh:mm') + '\n' + moment(this.state.date).format('A') } </Text>
          
          <TouchableOpacity
            onPress={this.addTime.bind(this)}
            underlayColor="transparent">
              <Text style={styles.text}>+</Text>
          </TouchableOpacity>
      
    
         
      </View>


                  
      <Button rounded block style={{backgroundColor: '#fff', marginTop: 20}} 
      textStyle={{color: '#00c497'}}
      // onPress={() => this.signUp()}
      >
                      Save
                  </Button>

                  
                
           </View>
           </Content>
           </Image>
           </Container>
       );
        return (
            <Container theme={theme} style={{backgroundColor: '#384850'}}>
                <Image source={require('../../../images/glow2.png')} style={styles.container} >
                    <Header>
                        <Button transparent onPress={() => this.popRoute()}>
                            <Icon name='ios-arrow-back' style={{fontSize: 30, lineHeight: 32}} />
                        </Button>

                        <Title>Settings</Title>

                        <Button transparent onPress={this.props.openDrawer}>
                            <Icon name='ios-menu' style={{fontSize: 30, lineHeight: 32}} />
                        </Button>
                    </Header>

                    <Container>
                  <Content>
                      <Picker
                          iosHeader="Select one"
                          mode="dropdown"
                          selectedValue={this.state.time}
                          onValueChange={this.onValueChange.bind(this)}>
                          <Picker.Item label="Set Favorite Appointment Time" style={{backgroundColor:'#fff'}} value="key0" />
                          <Picker.Item label="9 AM" value="key1" />
                          <Picker.Item label="10 AM" value="key2" />
                          <Picker.Item label="11 AM" value="key3" />
                          <Picker.Item label="12 AM" value="key4" />
                          <Picker.Item label="1 PM" value="key5" />
                          <Picker.Item label="2 PM" value="key6" />
                          <Picker.Item label="3 PM" value="key7" />
                     </Picker>
                     
                     <Button rounded block style={{backgroundColor: '#fff', marginTop: 20}} 
                     textStyle={{color: '#00c497'}}
                     // onPress={() => this.signUp()}
                     >
                         Set
                     </Button>
                     
                     
                  </Content>
              </Container>
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

export default connect(null, bindAction)(Settings);
