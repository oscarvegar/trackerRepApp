angular.module('starter.Modelorama', ['ionic', 'ngCordova'])

.controller('ModeloramasCtrl', function($scope, $ionicModal, $timeout,$http,$cordovaSplashscreen) {
	
	   $scope.modeloramas  = null;
       $http.get(HOST+"/api/modelorama/all").then(function(result){  
      	    	$cordovaSplashscreen.show();
      	    	$scope.modeloramas = result.data; 

      	});	

	
});