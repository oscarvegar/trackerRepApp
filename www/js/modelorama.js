angular.module('starter.Modelorama', [])

.controller('ModeloramasCtrl', function($scope, $ionicModal, $timeout,$http) {
	
	   $scope.modeloramas  = null;
       $http.get(HOST+"/api/modelorama/all").then(function(result){  
      	    	
      	    	$scope.modeloramas = result.data; 

      	});	

	
});