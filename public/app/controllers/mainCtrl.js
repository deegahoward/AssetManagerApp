

var mainApp = angular.module('mainCtrl', ['mainService', 'ui.router']);


mainApp.controller('MainController', function ($rootScope, $location, $scope, $state, Assets) {


    $scope.title = "Asset Manager";

    var vm = this;

    $scope.sortType = 'name';
    $scope.sortReverse = false;
    $scope.editorEnabled = false;
    $scope.assetCreated = false;


    Assets.all()

        .success(function (data) {

            console.log(data);
            $scope.Assets = data;

        });


    $scope.changeSort = function (selectedSort) {

        $scope.sortType = selectedSort;

        if($scope.sortReverse == true){

            $scope.sortReverse = false;
        }
        else {
            $scope.sortReverse = true;
        }

    };


    $scope.addAsset = function () {

        Assets.create(vm.newAsset)

            .then(function (response) {

                vm.newAsset = {};
                vm.message = response.data.message;
                console.log(response);
                $scope.assetCreated = true;

            })

    };

    $scope.deleteAsset = function (id, index) {

        console.log(id);
        Assets.delete(id)

            .success(function () {
                $scope.Assets.splice(index, 1);
            })

    };

    $scope.editAsset = function (asset) {

        console.log(asset);
        asset.edit = true;
        console.log(asset.edit);

    };

    $scope.disableEditor = function (asset) {

        asset.edit = false;

    };

    $scope.save = function (asset) {

        $scope.disableEditor(asset);
        Assets.update(asset)
        .success(function (data) {

                console.log(data);

            })

            .error(function(data){
                console.log(data);
            })
    };

});
