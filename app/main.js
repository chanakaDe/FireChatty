/**
 * Created by ChanakaDeSilva on 2/20/2015.
 */
var module = angular.module('fire_bird', ['ngRoute', 'firebase']);

module.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/view/Login.html',
            controller: ''
        }).when('/signup', {
            templateUrl: 'app/view/Signup.html',
            controller: ''
        }).when('/chat', {
            templateUrl: 'app/view/Chat.html',
            controller: ''
        }).when('/logout', {
            template: 'Logging Out',
            controller: 'LogoutController'
        }).otherwise({
            redirectTo: '/'
        });
});