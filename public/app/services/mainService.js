angular.module('mainService', [])

    .factory('Assets', function ($http) {

        var assetFactory = {};

        assetFactory.all = function () {
            return $http.get('/api/assets');
        };

        assetFactory.create = function (asset) {
            return $http.post('/api/assets', asset);
        };

        assetFactory.delete = function (id) {
            console.log(id);
            return $http.delete('/api/assets/' + id);
        };

        assetFactory.update = function (asset) {
            var id = asset.id;
            console.log(asset);
            return $http.put('/api/assets/' + id, asset);
        };

        return assetFactory;

    });
