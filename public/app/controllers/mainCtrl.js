
//------------------------- Overall Controller for Authentication methods ------------------------

//doLogin/doLogout methods from https://www.udemy.com/ realtime-meanstack/

var mainApp = angular.module('mainCtrl', ['surveyService', 'ui.router']);


mainApp.controller('MainController', function ($rootScope, $location, $scope, $state) {

    $scope.title = "AssetManager";


});

