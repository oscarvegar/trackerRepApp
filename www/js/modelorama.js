angular.module('starter.Modelorama', [])

.controller('ModeloramasCtrl', function($scope, $ionicModal, $timeout) {
	
       $scope.modeloramas = [
						{
							nombre :"Modelorama Cerrada De Lago Erene",
							direccion:"3Ra Cerrada De Lago Erene No 22 Miguel Hidalgo 11430 D.F.",
							location:{type:'Point', coordinates:[{longitud:-99.1912866,latitude:19.4490307}]}
						},
						{
						    nombre :"Modelorama Narvarte Poniente",
							direccion:"Calle Pitágoras No 1002 Narvarte Poniente, Benito Juárez 03020 Benito Juárez, D.F.",
							location:{type:'Point',coordinates:[{longitud:-99.1522758,latitude:19.3866443}]}
						},
						{
						    nombre :"Modelorama Obrera",
							direccion:"Calle Dr Erazo 73 Obrera, Cuauhtémoc 06720 D.F.",
							location:{type:'Point',coordinates:[{longitud:-99.1441497,latitude:19.4178632}]}
						},
						{
						    nombre :"Modelorama Alamos",
							direccion:"Segovia 45 Alamos 03400 Benito Juárez, D.F.",
							location:{type:'Point',coordinates:[{longitud:-99.1458846,latitude:19.4053095}]}

						},
						{
						   	nombre :"Modelorama Agricola Oriental",
							direccion:"Av Texcoco 122 Juárez Pantitlan 57460 Nezahualcóyotl, Méx.",
							location:{type:'Point',coordinates:[{longitud:-99.0489731,latitude:19.3937812}]}
						},
						{
						  	nombre :"Modelorama La Noria",
							direccion:"Av. Guadalupe I. Ramírez 660 Tierra Nueva, Xochimilco 16010 Ciudad de México, D.F.",
							location:{type:'Point',coordinates:[{longitud:-99.1244459,latitude:19.2681942}]}
						}
					] ;

			
	
});