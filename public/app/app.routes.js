angular.module('appRoutes', ['ui.router'])


    //routing for Main App


.config(function ($stateProvider, $locationProvider) {


    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'app/views/pages/home.html'

        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/pages/login.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'app/views/pages/signup.html'
        });


    $locationProvider.html5Mode(true);

});