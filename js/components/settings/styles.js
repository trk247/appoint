'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
      width: null,
      height: null,
      flex: 1
  },
 rowContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 20
},
text: {
  fontSize: 20,
  textAlign: 'center',
  fontWeight: '500',
  margin: 10,
  color: '#fff',
},
submit: {
  width: 50
}
});
