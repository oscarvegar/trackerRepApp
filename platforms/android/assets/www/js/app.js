var _HOST = "http://yoplanner.com:1337";
io.sails.url = 'http://yoplanner.com:1337';
var _HOST_PUSH_SERVER = "http://yoplanner.com:1337";

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.Modelorama', 
  'ngCordova', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform, $cordovaLocalNotification, $rootScope, $ionicPopup, 
  $interval, $http, $cordovaGeolocation, $state,$timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  
    $interval(function(){
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
            var latitude  = position.coords.latitude
            var longitude = position.coords.longitude
            var request = {id:"55f4e2e42ac16ca1293d7706", coordinates:[longitude, latitude]};
            $http.post( _HOST + "/api/repartidor/updateLocation/", request)
            .then(function(res){});
        }, function(err) {
          //alert("Error al obtener ubicación: " + err);
      });
    },30000);


    $rootScope.scheduleSingleNotification = function (id, data) {
      $cordovaLocalNotification.schedule({
        id: id,
        title: 'NUEVA ORDEN DE ENTREGA',
        text: 'Tienes una nueva orden de entrega',
        data: data
      }).then(function (result) {
        var myPopup = $ionicPopup.show({
            template: '<center>Tienes una nueva orden de entrega</center>',
            title: 'NUEVA ORDEN DE ENTREGA',
            scope: $scope,
            buttons: [ { text: 'Cancelar' },
                       {text: '<b>Aceptar</b>',type: 'button-positive',
                        onTap:function(e){
                          return data;
                        }}]
        });
         myPopup.then(function(res) {
            if(res){
                alert("Ver detalle de la compra: " + res);
            }
        });
      });


    };

   $rootScope.$on('$cordovaLocalNotification:click',
      function (event, notification, state) {
        //alert("notification **ver detalle de la compra**: " );
        $state.go("app.pedidos");
    });



    HOST = "http://yoplanner.com:1337";
    io.sails.url = 'http://yoplanner.com:1337';

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
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
        templateUrl: 'templates/search.html',
         controller: 'ModeloramasCtrl'
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
    })
    .state('app.mapa', {
      url: '/mapa',
      views: {
        'menuContent': {
          templateUrl: 'templates/mapa.html',
          controller: 'MapaCtrl'  
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/pedidos');
});
