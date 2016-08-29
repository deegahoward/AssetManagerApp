angular.module('appRoutes', ['ui.router'])


    //routing for Main App


.config(function ($stateProvider, $locationProvider) {


    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'app/views/pages/home.html'

        })
        .state('view', {
            url: '/view',
            templateUrl: 'app/views/pages/viewAssets.html'
        })
        .state('add', {
            url: '/add',
            templateUrl: 'app/views/pages/addAsset.html'
        });


    $locationProvider.html5Mode(true);

});