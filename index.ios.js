'use strict';

import { AppRegistry, AsyncStorage } from 'react-native';
import setup from './js/setup';

import OneSignal from 'react-native-onesignal';

var pendingNotifications = [];
// var _navigator; // If applicable, declare a variable for accessing your navigator object to handle payload.
// function handleNotification (notification) { // If you want to handle the notifiaction with a payload.
//     _navigator.to('main.post', notification.data.title, {
//      article: {
//        title: notification.data.title,
//        link: notification.data.url,
//        action: notification.data.actionSelected
//      }
//     });
// }s

// Google Server API Key help
// AIzaSyAqnBRBV2X5RPUKCMFFS3tau1xd2H1f-Zk
// Sender/Porject ID help
// 338952829101

OneSignal.configure({
    onIdsAvailable: function(device) {
        console.log('UserId = ', device.userId);
        console.log('PushToken = ', device.pushToken);        
        
        try {
          AsyncStorage.setItem('@UserId:key', JSON.stringify(device.userId));
        }  catch (error) {
          console.log(error);
        }
        
        try {
          AsyncStorage.setItem('@PushToken:key', JSON.stringify(device.pushToken));
        }  catch (error) {
          console.log(error);
        }
    },
  onNotificationOpened: function(message, data, isActive) {
      var notification = {message: message, data: data, isActive: isActive};
      console.log('NOTIFICATION OPENED: ', notification);
      //if (!_navigator) { // Check if there is a navigator object. If not, waiting with the notification.
      //    console.log('Navigator is null, adding notification to pending list...');
          pendingNotifications.push(notification);
      //    return;
      // }
      handleNotification(notification);
  }
});

AppRegistry.registerComponent('appoint', setup);