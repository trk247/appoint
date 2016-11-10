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
  }
});
