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
        marginTop: (deviceHeight/2) - 105,
        backgroundColor: '#0097d6',
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 0
    },
    viewFeedback: {    
      flex:1,
      padding: 0,
    },
    viewFeedbackHidden: {
      height: 10,
      opacity:0
    },
    feedback: {
      flex:1,
      textAlign: 'left',
      overflow: 'hidden',
      color: '#D63301',
      backgroundColor: '#FFCCBA',
      fontWeight: 'bold',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#000000',
      borderBottomWidth: 2,
      padding: 10,
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
