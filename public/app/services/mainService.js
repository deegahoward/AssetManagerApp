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

        /*

        surveyFactory.update = function (survey) {
            var id = survey._id;
            console.log(survey);
            return $http.put('/api/surveys/' + id, survey);
        };

        surveyFactory.getOne = function (id) {

            return $http.get('/api/surveys/' + id);
        };

       */

        return assetFactory;

    });
