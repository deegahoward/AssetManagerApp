//------------------------- Overall Controller for Authentication methods ------------------------

//doLogin/doLogout methods from https://www.udemy.com/ realtime-meanstack/

var mainApp = angular.module('mainCtrl', ['mainService', 'ui.router']);


mainApp.controller('MainController', function ($rootScope, $location, $scope, $state, Assets) {

    $scope.title = "Asset Manager";

    var vm = this;


    Assets.all()
        .success(function (data) {
            console.log(data);
            $scope.Assets = data;
        });


    $scope.addAsset = function () {

        Assets.create(vm.newAsset)
        .then(function (response) {
            vm.newAsset = {};
            vm.message = response.data.message;

            console.log(response);

        })
    };

    $scope.deleteAsset = function(id){

        Asset.delete(id);

    }


});

