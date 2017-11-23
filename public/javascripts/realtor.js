var app = angular.module('Realtor', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/house/:id', {
      templateUrl: 'partials/house-detail.html',
      controller: 'HouseDetailCtrl'
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

app.controller('HouseDetailCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function($scope, $resource, $location, $routeParams) {	
    var Houses = $resource('/api/houses/:id', { id: '@_id' });
    Houses.get({ id: $routeParams.id }, function(house) {
      $scope.house = house;
    });
  }
]);