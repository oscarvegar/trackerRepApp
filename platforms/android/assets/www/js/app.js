var _HOST = "http://192.168.1.72:1337";
io.sails.url = 'http://192.168.1.72:1337';
var _HOST_PUSH_SERVER = "http://192.168.1.72:1337";

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $cordovaLocalNotification, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  
    $rootScope.scheduleSingleNotification = function () {
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        data: {
          customProperty: 'custom value'
        }
      }).then(function (result) {
        alert("Result Noti: " + JSON.stringify(result));
      });
    };

    $rootScope.updateNotifications = function (chosenHours) {
      cordova.plugins.notification.local.cancelAll(); 
      var now = new Date().getTime(),
          _5_sec_from_now = new Date(now + 5 * 1000);
      cordova.plugins.notification.local.schedule({
              title: "Tweet Hours are Starting",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec magna libero. Ut at massa pellentesque massa euismod volutpat id quis metus.",
              at: _5_sec_from_now,
              badge: 1
      });
    };


    HOST = "http://192.168.1.72:1337";
    io.sails.url = 'http://192.168.1.72:1337';

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.$on('$cordovaLocalNotification:click',
      function (event, notification, state) {
      alert("notification : "+JSON.parse(notification));
    });

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      alert(JSON.stringify(notification))
      switch(notification.event) {
        case 'registered':
          if (notification.regid.length > 0 ) {
            alert('registration ID = ' + notification.regid);
          }
          break;
        case 'message':
          alert("notificaction message event: " + JSON.stringify(notification))
          break;

        case 'error':
          alert('GCM error = ' + notification.msg);
          break;

        default:
          alert('An unknown GCM event has occurred');
          break;
        }
      });

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.pedidos', {
      url: '/pedidos',
      views: {
        'menuContent': {
          templateUrl: 'templates/pedidos.html',
          controller: 'PedidosCtrl'  
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/pedidos');
});
