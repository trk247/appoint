'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
        width: null,
        height: null,
        flex: 1
    },
    card: {
        borderWidth: 0
    },
    cardHeader: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        paddingBottom: 10,
        height: 65,
        flex:10,
        flexDirection: 'row'
    },
    cardItem: {
        backgroundColor: 'transparent',
        paddingTop: 5,
        paddingLeft: 55
    },
    date: {
        textAlign: 'right',
        fontSize: 13,
        fontWeight: '400',
        color: '#ddd',
        width: 70
    },   
    item: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap'
      
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
