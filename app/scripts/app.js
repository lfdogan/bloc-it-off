//The root Angular module will act as a container for different parts of our application.

 (function() {
     function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,/*hashbang URLs are disabled; that is, users will see clean URLs without the hashbang*/
                requireBase: false/*unrelated to the hashbang issue, but is one way to avoid a common $location error.*/
         });
         $stateProvider
         //in LandingCtrl.js refer to variables as this.landing but in landing.html as landing.title
             .state('main', {
                 url: '/',
                 controller: 'MainCtrl as main',
                 templateUrl: '/templates/main.html'
             })
             .state('current', {
                 url: '/current',
                 controller: 'MainCtrl as main',
                 templateUrl: '/templates/current.html'
         });
     }


//define a module with angular.module: The first argument passed is the prescribed name of the module. The array, passed as the second argument, injects dependencies into an application. with 'firebase' dependency the $firebaseObject, $firebaseArray, and $firebaseAuth services are available to be injected into any controller, service, or factory.
     //$firebaseArray() can be used to sync a Firebase database with an Angular model like an array of tasks. 
     angular
         .module('blocItOff', ['ui.router', 'firebase'])
         .config(config);
 })();

