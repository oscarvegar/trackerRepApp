angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };


 $scope.salir = function (){
   ionic.Platform.exitApp();
 };

})

.controller('PedidosCtrl', function( $scope, $rootScope, $ionicModal, $cordovaLocalNotification, $timeout ){  
  $scope.idCount = 0;
  $scope.init = function(){
    io.socket.get('/api/orden/subscribe',function(data,jwres){});
  }
  $scope.init();
  $rootScope.pedidos = [];
  io.socket.on('create', function(obj){
    $rootScope.ordenNueva = obj;
    if( $rootScope.pedidos.length === 0 ){
      $rootScope.pedidos.push( obj );
    }else{
      var existe = false;
      for( var ip in $rootScope.pedidos ){
        if($rootScope.pedidos[ip].id === obj.id){
          existe = true;
          break;
        }
      }
      if( !existe ){
        $rootScope.pedidos.push( obj );
      }
    }
    console.log("Nueva Orden -pedidos-: ", $rootScope.pedidos); 
    $scope.$apply();
    $rootScope.scheduleSingleNotification( ++$scope.idCount, obj );
  });

  $scope.goMapa = function(index){
    console.log("index: " + index);
    $scope.map = { center: { latitude: 19.432791, longitude: -99.1335314 }, zoom: 6 };

    $rootScope.ordenSelected = $rootScope.pedidos[index];
  }

})

.controller('MapaCtrl', function( $scope, $rootScope, $ionicModal, $cordovaLocalNotification, $timeout ){  
  console.log("Orden a mostrar: ", $rootScope.ordenSelected);
  $scope.map = { center: { latitude: 19.432791, longitude: -99.1335314 }, zoom: 6 };
  $scope.markerIconSize = new google.maps.Size(30,30);
  $scope.puntos = [];

  $scope.puntos.push({
    id:0,
    latitude:eval($rootScope.ordenSelected.repartidor.currentLocation.coordinates[1]),
    longitude:eval($rootScope.ordenSelected.repartidor.currentLocation.coordinates[0]),
    icon:{url:"img/construction.png",scaledSize:$scope.markerIconSize}
  });

  $scope.puntos.push({
    id:1,
    latitude:eval($rootScope.ordenSelected.modelorama.location.coordinates[1]),
    longitude:eval($rootScope.ordenSelected.modelorama.location.coordinates[0]),
    icon:{url:"img/office-building.png",scaledSize:$scope.markerIconSize}
  });

  $scope.puntos.push({
    id:2,
    latitude:eval($rootScope.ordenSelected.location.coordinates[1]),
    longitude:eval($rootScope.ordenSelected.location.coordinates[0]),
    icon:{url:"img/parkinggarage.png",scaledSize:$scope.markerIconSize}
  });

  console.log("Puntos a mostrar: ", $scope.puntos);

});
