angular.module('starter.pedidos', [])

.controller('PedidosCtrl2', function($scope, $ionicModal, $cordovaLocalNotification, $timeout) {
	
	$scope.init = function(){
		
		io.socket.get('/api/orden/subscribe',function(data,jwres){
    		alert("subscrito: " + JSON.stringify(data) );
    	});

		$cordovaLocalNotification.schedule({
	         	id: 1,
	          	title: "Nueva orden de servicio",
	          	text: "Tiene ud. una nueva orden de servicio",
	          	data: "data"
	        }).then(function (result) {
	          	alert(" Result: " + result);
	        }).catch(function(err){
	          	alert(err)
	        });

  	}

  	$scope.init();

  	io.socket.on('create', function(obj){
    	alert("Nueva Solicitud");
    	//if( isProduction = false ){
	    	$cordovaLocalNotification.schedule({
	         	id: 1,
	          	title: "Nueva orden de servicio",
	          	text: "Tiene ud. una nueva orden de servicio",
	          	data: obj.data
	        }).then(function (result) {
	          	alert(" Result: " + result);
	        }).catch(function(err){
	          	alert(err)
	        });

	        cordova.plugins.notification.local.on("click", function (notification) {
				alert("Ver detalle de servicio: " + JSON.stringify(notification) ) ;
			});

    	//}else{

    	//}

  });

});