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
             .state('home', {
                 url: '/',
//                 controller: 'HomeCtrl as home',
                 templateUrl: '/templates/home.html'
//             })
//             .state('album', {
//                 url: '/album',
//                 controller: 'AlbumCtrl as album',
//                 templateUrl: '/templates/album.html'
//             })
         });
     }
//define a module with angular.module: The first argument passed is the prescribed name of the module. The array, passed as the second argument, injects dependencies into an application.
     angular
         .module('blocItOff', ['ui.router', 'firebase'])
         .config(config);
 })();

