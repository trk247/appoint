'use strict';

import React, { Component, TabBarIOS } from 'react';
import { Image, ListView,  } from 'react-native';
import { connect } from 'react-redux';

import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';

import { Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, View, Thumbnail } from 'native-base';

import theme from '../../themes/base-theme';
import styles from './styles';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


class Appointments extends Component {

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
          results: ''
          
        }
        ]),
      };

  }
  
    popRoute() {
        this.props.popRoute();
    }

    getAppointments() {

      fetch('http://www.appointshare.com/getUpcomingAppointments.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'upcoming'
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        if (responseData == 'zero') {
          this.setState({result: 'You have no upcoming appointments.'})
        } else {
            this.setState({
              dataSource: ds.cloneWithRows(responseData),
            });
        }
          
      })
    }

    
    componentWillMount() {
  
      var data = this.getAppointments();
    this.setState({data : data});
    // console.log(data);
      // const appt = this.getAppointments();
    }
      renderRow(rowData) {
        // console.log(rowData.patient_name);
        if (typeof rowData.patient_name === "undefined") {
          return(<Text></Text>);
        }
        
        return (
          <Card transparent foregroundColor='#fff' style={styles.appt_card}>
              <CardItem style={styles.cardHeader}  header>
                  <Thumbnail source={require('../../../images/appointshare.png')} />
                  <Text>{rowData.patient_name}</Text>
                  
                  <Text style={styles.appt_date}>Appointment Time: {rowData.time}</Text>
              </CardItem>

              <CardItem style={styles.appt_cardItem} >
              <Text style={styles.item}>Date: {rowData.date}</Text>
              <Text style={styles.item}>Time: {rowData.time}</Text>
              <Text style={styles.item}>Location: {rowData.location}</Text>
              <Text style={styles.item}>Status: {rowData.status}</Text>
              <Text style={styles.item}>Birth Date: {rowData.birth_date_string}</Text>
              
              <Text style={styles.item}>Type: {rowData.appt_type}</Text>
              <Text style={styles.item}>Patient Number: {rowData.patient_number}</Text>
            
          
              </CardItem>
          </Card>
      
      
        
        )
      
      
      
      }
    render() {
        // <Container theme={theme} style={{backgroundColor: '#384850'}}>
// <Content style={{backgroundColor: 'transparent'}}>
// <Header>
//     <Button transparent onPress={() => this.popRoute()}>
//         <Icon name='ios-arrow-back' style={{fontSize: 30, lineHeight: 32}} />
//     </Button>
// 
//     <Title>Appointments</Title>
// 
//     <Button transparent onPress={this.props.openDrawer}>
//         <Icon name='ios-menu' style={{fontSize: 30, lineHeight: 32}} />
//     </Button>
//     
// </Header>
        return (
          
          <Container theme={theme} style={{backgroundColor: '#384850'}}>
              <Image source={require('../../../images/glow2.png')} style={styles.appt_container} >
              <Header>
                  <Button transparent> </Button>

                  <Title>Upcoming Appointments</Title>

                  <Button transparent onPress={this.props.openDrawer} >
                      <Icon name='ios-menu' style={{fontSize: 30, lineHeight: 32}} />
                  </Button>
              </Header>

                  
                  <Content>
                  <Text style={styles.appt_feedback}>{this.state.result}</Text>
                  <ListView 
                  initialListSize={0}
          contentInset={{top: 0}}
          automaticallyAdjustContentInsets={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)} 
          
        />


                    
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

export default connect(null, bindAction)(Appointments);
