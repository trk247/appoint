'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
    appt_container: {
        width: null,
        height: null,
        flex: 1
    },
    appt_card: {
        borderWidth: 0
    },
    appt_cardHeader: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        paddingBottom: 10,
        height: 65,
        flex:10,
        flexDirection: 'row'
    },
    appt_cardItem: {
        backgroundColor: 'transparent',
        paddingTop: 5,
        paddingLeft: 55
    },
    appt_date: {
        textAlign: 'right',
        fontSize: 13,
        fontWeight: '400',
        color: '#ddd',
        width: 70
    },   
    appt_item: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap'
      
    },
    appt_list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    appt_feedback: {
      color: '#fff',
      fontWeight: 'bold',
      padding: 20,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
});
