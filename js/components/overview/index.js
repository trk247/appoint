'use strict';

import React, { Component, TabBarIOS } from 'react';
import { Image, TextInput, AppRegistry, TouchableHighlight, TouchableButton, TouchableOpacity, AsyncStorage, ListView  } from 'react-native';

import { connect } from 'react-redux';

import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';

import { Footer, Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, View, Thumbnail, List, ListItem, CheckBox } from 'native-base';
import FooterComponent from './../footer';
import theme from '../../themes/base-theme';
import styles from './styles';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var ItemCheckbox = require('react-native-item-checkbox');
var moment = require('moment');

class Overview extends Component {

  constructor(props) {
      super(props);
      
      this.state = {
        dataSource: ds.cloneWithRows([
          {
            name: '', 
            time: '',
            location: '',
            status: '',
            birthDate: '',
            patient_number: '',
          }
        ]),
        timeDate: moment().add(30 - moment(new Date()).minutes() % 30, 'minutes'),
        date: new Date(),
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: '',
        uid: ''
      };

      AsyncStorage.getItem("@uid:key").then((value) => {
        this.setState({uid: value});
      }).done();

  }
  
  onSubmit() {
    let {timeDate, date, uid} = this.state;
    fetch('http://app.appointshare.com/remote_preferences', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: timeDate,
        timeDate: moment(timeDate).format('hh:mm') + ' ' + moment(timeDate).format('A'),
        uid: uid,
        mon: this.state.mon,
        tue: this.state.tue,
        wed: this.state.wed,
        thu: this.state.thu,
        fri: this.state.fri,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      // console.log(responseData);
      if (responseData == 'success') {
        alert('Your scheduling preferences have been updated.');
      } else {
        alert('A server error occured, please try again later.');
      }
    })
    .catch((error) => {
      // console.warn(error);
      alert('A server error occured, please try again later.');
    })
    .done();
  }
    popRoute() {
        this.props.popRoute();
    }
    
    onDateChange (date) {
        this.setState({ date: date });
    }

    getAppointments() {

      fetch('http://www.appointshare.com/getUpcomingAppointments.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'all'
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
            
            this.setState({
              dataSource: ds.cloneWithRows(responseData),
            });
        
          
      })
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
    componentWillMount() {
      var data = this.getAppointments();
      this.setState({data : data});
    // console.log(data);
      // const appt = this.getAppointments();
    }
      renderRow(rowData) {
        // console.log(rowData);
        if (typeof rowData.patient_name === "undefined") {
          return(<Text></Text>);
        }

        return (
          <View style={styles.cardContainer}>
          <Card transparent foregroundColor='#fff' style={styles.card}>
              <CardItem style={styles.cardHeader}  header>
                  <Thumbnail source={require('../../../images/ach.png')} />
                  <Text>{rowData.patient_name}</Text>
                  
                  <Text style={styles.date}>Appointment Time: {rowData.time}</Text>
              </CardItem>

              <CardItem style={styles.cardItem} >
                <Text style={styles.item}>Date: {rowData.date}</Text>
                <Text style={styles.item}>Time: {rowData.time}</Text>
                <Text style={styles.item}>Location: {rowData.location}</Text>        
                <Text style={styles.item}>{rowData.description}</Text>            
              </CardItem>
          </Card>
          </View>
      
      
        
        )
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

                  <Title>Overview</Title>

                  
              </Header>

                  <Content style={{backgroundColor: 'transparent'}}>

                  <ListView 
          contentInset={{top: 0}}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)} 
          
        />
        <Text style={styles.text}>Choose your preferred time and day to get notified when a cancellation occurs.</Text>
      
<View style={styles.preferContainer}>      

          <View style={styles.checkBoxStyle}>
        
          <ItemCheckbox // https://www.npmjs.com/package/react-native-item-checkbox
            color="#0097d6"
            checked={false}
            size={20}
            label="Monday"
            onChange={(checked) => this.setState({checked})}
          />
          <Text style={styles.dayText}>Monday </Text>
          
          </View>
          <View style={styles.checkBoxStyle}>
          <ItemCheckbox // https://www.npmjs.com/package/react-native-item-checkbox
            color="#0097d6"
            checked={false}
            size={20}
            label="Monday"
            onChange={(checked) => this.setState({checked})}
          />
          <Text style={styles.dayText}>Tuesday</Text>
          </View>
          <View style={styles.checkBoxStyle}>
          <ItemCheckbox // https://www.npmjs.com/package/react-native-item-checkbox
            color="#0097d6"
            checked={false}
            size={20}
            label="Monday"
            onChange={(checked) => this.setState({checked})}
          />
          <Text style={styles.dayText}>Wednesday</Text>

        </View>
<View style={styles.checkBoxStyle}>

<ItemCheckbox // https://www.npmjs.com/package/react-native-item-checkbox
  color="#0097d6"
  checked={false}
  size={20}
  label="Monday"
  onChange={(checked) => this.setState({checked})}
/>


<Text style={styles.dayText}>Thursday</Text>
</View>
<View style={styles.checkBoxStyle}>
<ItemCheckbox // https://www.npmjs.com/package/react-native-item-checkbox
  color="#0097d6"
  checked={false}
  size={20}
  label="Monday"
  onChange={(checked) => this.setState({checked})}
/>
<Text style={styles.dayText}>Friday</Text>
</View>
              
                    
<View >
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
  

<Button rounded block style={{backgroundColor: '#fff', marginTop: 0}} 
  textStyle={{color: '#00c497'}}
  onPress={() => this.onSubmit()}
  >
        Save
</Button>                
</View>
                    
              
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
        popRoute: () => dispatch(popRoute()),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Overview);
