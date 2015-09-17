
var _HOST = "http://yoplanner.com:1337";
io.sails.url = 'http://yoplanner.com:1337';
var _HOST_PUSH_SERVER = "http://yoplanner.com:1337";

angular.module('starter.controllers', ['uiGmapgoogle-maps'])

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.idCount = 0;
  $scope.idPolyLineCount = 0;
  $scope.idPointCount = 0;
  $rootScope.pedidos = [];
  $rootScope.username = "oscar.vega";
  $rootScope.mensajeConexion = "";

  // Create the login modal that we will use later
//  $ionicModal.fromTemplateUrl('templates/login.html', {
//    scope: $scope
//  }).then(function(modal) {
//    $scope.modal = modal;
//  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    console.log("Usuario: " + $scope.loginData.username + "/" + $scope.loginData.password);
      angular.forEach($rootScope.repartidores, function(value, key){
         console.log(value.nombre);
          if(value.nombre===$scope.loginData.username){
              $state.go('app.mapa');
              $rootScope.repartidor = value;
          }
      });
  };


  $scope.salir = function(){
      ionic.Platform.exitApp();
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

  $scope.init = function(){
    io.socket.get( _HOST + '/api/orden/subscribe',function(data,jwres){}); 
  }

  io.socket.on('connect', function(){
    console.log('CONECTADO A SERVIDOR');
    $rootScope.mensajeConexion = "La conexión se ha reestablecido";
    $rootScope.isConnected = true;
    $rootScope.color = "green";
    $timeout(function(){
      $rootScope.mensajeConexion = null;
    },2000);
    $scope.init();
  });

  io.socket.on('disconnect', function(){
    $rootScope.isConnected = false;
    $rootScope.color = "red";
    $rootScope.mensajeConexion = "Se ha perdido la conexión con el servidor de mensajes, intentando reconexión ...";
  });

  $scope.init();
  

})

.controller('PedidosCtrl', function( $scope, $rootScope, $ionicModal, 
  $cordovaLocalNotification, $timeout, $state ){  
  $scope.goMapa = function(index){
    $rootScope.ordenSelected = $rootScope.pedidos[index];
  }

})

.controller('MapaCtrl', function( $scope, $rootScope, $timeout, $cordovaLocalNotification, $ionicScrollDelegate ){  
  $scope.puntos = [];
  $scope.polylines = [];


  io.socket.on('create', function(obj) {
    $rootScope.ordenSelected = obj;
    console.log("Nueva Orden::: ", $rootScope.ordenSelected ); 
    //alert("Nueva Orden::: " + $rootScope.ordenSelected ); 
    // Si el usuairo repartido logueado no esta asignado a la orden, no hacer nada
    if( obj.usuario.username !== $rootScope.username ) return;
    
    if( $rootScope.pedidos.length === 0 ){
      $rootScope.pedidos.push( obj );
    } else {
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
    console.log("Nueva Orden - pedidos-: ", $rootScope.pedidos); 
    $scope.dibujarOrdenes(obj); 
    $scope.$applyAsync();
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
    $rootScope.scheduleSingleNotification( ++$scope.idCount, obj );
  });

  $scope.initMap = function() {
    $scope.map = { center: { latitude: 19.432791, longitude: -99.1335314 }, zoom: 10 };
    if( $rootScope.pedidos.length > 0 ){
      $scope.dibujarOrdenes();
    }
  }

  $scope.dibujarOrdenes = function(ordenSelected){
      
        $scope.puntos.push({ id:$scope.idPointCount++,
                             latitude:eval(ordenSelected.repartidor.currentLocation.coordinates[1]),
                             longitude:eval(ordenSelected.repartidor.currentLocation.coordinates[0]),
                             icon:{url:"img/vespa.png"}
                          });

        $scope.puntos.push({id:$scope.idPointCount++,
                            latitude:eval(ordenSelected.modelorama.location.coordinates[1]),
                            longitude:eval(ordenSelected.modelorama.location.coordinates[0]),
                            icon:{url:"img/office-building.png"}
                          });

        $scope.puntos.push({id:$scope.idPointCount++,
                            latitude:eval(ordenSelected.location.coordinates[1]),
                            longitude:eval(ordenSelected.location.coordinates[0]),
                            icon:{url:"img/orden.png"},
                            orden:ordenSelected,
                            mostrarDatos:$scope.verDetalle
                          });

        
        var puntosPath = [];
        for( var iPath in ordenSelected.ruta ){
          //console.log( "Ruta Simple::", $rootScope.ordenSelected.ruta[iPath] );
          var pos = ordenSelected.ruta[iPath];
          var objPath = { latitude: pos[0], longitude: pos[1] };
          puntosPath.push( objPath );
        }
        $scope.polylines.push(
            {
                id: $scope.idPolyLineCount,
                path: puntosPath,
                stroke: {
                    color: '#6060FB',
                    weight: 3
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                icons: [{
                    offset: '25px',
                    repeat: '50px'
                }]
            }
        );
      
  }

  $scope.verDetalle = function( marker ){
    console.log("Clicked en puntos", marker.model);
    $scope.ordenSelected = marker.model.orden;
  }


  $scope.initMap();

});
