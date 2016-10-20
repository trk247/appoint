'use strict';

import { AppRegistry, AsyncStorage } from 'react-native'
import setup from './js/setup'

import OneSignal from 'react-native-onesignal'; // Import package from node modules
// var _navigator; // If applicable, declare a variable for accessing your navigator object to handle payload.

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
      console.log('MESSAGE: ', message);
      console.log('DATA: ', data);
      console.log('ISACTIVE: ', isActive);
      // Do whatever you want with the objects here
      // _navigator.to('main.post', data.title, { // If applicable
      //  article: {
      //    title: data.title,
      //    link: data.url,
      //    action: data.actionSelected
      //  }
      // });
  }
});




AppRegistry.registerComponent('appoint', setup);
