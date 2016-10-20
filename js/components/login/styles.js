'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
    },
    shadow: {
        flex: 1,
        width: null,
        height: null,
        // backgroundColor: 'transparent'
    },

    bg: {
        flex: 1,
        marginTop: (deviceHeight/2)-30,
        backgroundColor: '#0097d6',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 70
    },
    feedback: {
      textAlign: 'left',
      color: '#fff',
      fontWeight: 'bold'
    },
    underlayColor: {
      color: '#fff'
    },
    containerStyle: {
      color: '#fff',
      // backgroundColor: '#0097d6'
    },
    labelStyle: {
      color: '#fff',
      // backgroundColor: '#0097d6'
    },
    checkBoxStyle: {
      marginBottom: 30, 
      flex: 1, 
      flexDirection:'row', 
      alignItems:'center', 
      justifyContent:'flex-end',
      
    }
});
