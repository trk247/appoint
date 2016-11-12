'use strict';

var React = require('react-native');

var { StyleSheet } = React;


  module.exports = StyleSheet.create({
      container: {
          width: null,
          height: null,
          flex: 1
      },
      cardContainer: {
        padding: 10,
        bottom: 0

      },
      card: {
        backgroundColor: '#2758a7',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#000000',
        borderBottomWidth: 2
      },
      cardHeader: {
          backgroundColor: 'transparent',
      },
      cardItem: {
          backgroundColor: 'transparent',
          borderBottomWidth: 0
      },
      date: {
        textAlign: 'center'
      },
      checkBoxStyle: {
        flexDirection:'row', 
        alignItems:'center', 
        marginLeft: 20,
        marginBottom: 5
      },
      rowContainer: {
       flexDirection: 'row',
       justifyContent: 'center',
       marginBottom: 0
     },
     text: {
       fontSize: 20,
       textAlign: 'center',
       fontWeight: '500',
       margin: 10,
       color: '#fff',
     },
     dayText: {
       fontSize: 20,
       textAlign: 'center',
       fontWeight: '400',
       margin: 10,
       color: '#fff',
     },
     calendarText: {
       fontSize: 20,
       textAlign: 'center',
       fontWeight: '500',
       color: '#fff',
     },
     submit: {
       width: 50
     }
  });