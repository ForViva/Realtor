var app = angular.module('Realtor', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', 
  function($scope, $resource) {
    var Houses = $resource('/api/houses');
    Houses.query(function(houses) {
      $scope.houses = houses;
    });
  }
]);