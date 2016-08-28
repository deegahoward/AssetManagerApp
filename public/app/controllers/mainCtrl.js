
//------------------------- Overall Controller for Authentication methods ------------------------

//doLogin/doLogout methods from https://www.udemy.com/ realtime-meanstack/

var mainApp = angular.module('mainCtrl', ['mainService', 'ui.router']);


mainApp.controller('MainController', function ($rootScope, $location, $scope, $state, Assets) {

    $scope.title = "Asset Manager";


    Assets.all()
        .success(function (data){

            console.log(data);

            $scope.Assets = data;

        })

});

