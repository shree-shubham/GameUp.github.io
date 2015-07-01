Parse.initialize("gtqTs8Mqc9MdXtS8UiFWBIhcxCjAS1SVwuMwnl26", "9VawOubEqtZK271El0DzWO8wDCSy8txlXsSUwcLZ");

var GameUpApp = angular.module('GameUpApp', ['ngResource', 'ngRoute', 'ngMessages', 'satellizer', 'parse-angular']);


GameUpApp.run(['$rootScope', function($scope) {
  $scope.currentUser = Parse.User.current();

  $scope.logOut = function(form) {
    Parse.User.logOut();
    $scope.currentUser = null;
    console.log("logged out!");
  };

}]);


GameUpApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'HomeController',
      templateUrl: 'app/views/home.html'
    })
    .when('/create_event', {
      controller: 'EventController',
      templateUrl: 'app/views/create_event.html'
    })
    .when('/login', {
      controller: 'LoginController',
      templateUrl: 'app/views/login.html'
    })
    .when('/signup', {
      controller: 'SignupController',
      templateUrl: 'app/views/signup.html'
    })
    .when('/profile', {
      controller: 'ProfileController',
      templateUrl: 'app/views/profile.html'
    })
    .otherwise({
      redirectTo: '/'
    });

});