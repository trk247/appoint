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


class PreviousAppointments extends Component {

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
          patient_number: ''
          
        }
        ]),
      };

  }
  
    popRoute() {
        this.props.popRoute();
    }

    getAppointments() {

      fetch('http://www.appointshare.com/getAppointments.php', {
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

        return (
          <Container theme={theme} style={{backgroundColor: '#384850'}}>
              <Image source={require('../../../images/glow2.png')} style={styles.container} >
              <Header>
              <Button transparent onPress={this.props.openDrawer} >
                  <Icon name='ios-menu' style={{fontSize: 30, lineHeight: 32}} />
              </Button>

                  <Title>Previous Appointments</Title>

                  
              </Header>

                  <Content style={{backgroundColor: 'transparent'}}>
                  
                  <ListView 
          contentInset={{top: 0}}
          automaticallyAdjustContentInsets={false}
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

export default connect(null, bindAction)(PreviousAppointments);
