'use strict';

import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { closeDrawer } from '../../actions/drawer';
import { replaceOrPushRoute } from '../../actions/route';

import { Icon, View, Text } from 'native-base';

import styles from './styles';

import IconFA from 'react-native-vector-icons/FontAwesome';

const overviewIcon = (<IconFA name="newspaper-o" size={28} style={{textAlign: 'center'}} color="#fff" />);
const groupIcon = (<IconFA name="users" size={28} color="#fff" style={{textAlign: 'center'}} />);
const calendarIcon = (<IconFA name="calendar" size={28} color="#fff" style={{textAlign: 'center'}} />);
const newsIcon = (<IconFA name="inbox" size={28} color="#fff" style={{textAlign: 'center'}} />);
const alertIcon = (<IconFA name="bell" size={28} color="#fff" style={{textAlign: 'center'}} />);

class Footer extends Component {

	navigateTo(route) {
        this.props.closeDrawer(); 
        this.props.replaceOrPushRoute(route);
    }

	render() {
		return (
			<View style={styles.footer}>
			
				
				<TouchableOpacity onPress={() => this.navigateTo('overview')}>
					{overviewIcon}
					<Text style={styles.iconText}>Overview</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.navigateTo('news')}>
					{newsIcon}
					<Text style={styles.iconText}>News</Text>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={() => this.navigateTo('calendar')}>
					{calendarIcon}
					<Text style={styles.iconText}>Calendar</Text>
				</TouchableOpacity>
			
				<TouchableOpacity onPress={() => this.navigateTo('groups')}>
					{groupIcon}
					<Text style={styles.iconText}>Groups</Text>
				</TouchableOpacity>
			
				<TouchableOpacity onPress={() => this.navigateTo('messages')}>
					{alertIcon}
					<Text style={styles.iconText}>Messages</Text>
				</TouchableOpacity>
								
			</View>
		);
	}
}

function bindAction(dispatch) {
    return {
    	closeDrawer: ()=>dispatch(closeDrawer()),
      replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(Footer);
