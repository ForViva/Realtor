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
    .when('/favorites', {
      templateUrl: 'partials/favorites.html',
      controller: 'FavoritesCtrl'
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
    var Favi = $resource('/api/favorites/:id', { id: '@_id' });
    Houses.get({ id: $routeParams.id }, function(house) {
      $scope.house = house;
    });
    Favi.get({ id: $routeParams.id }, function(favi) {
      $scope.favi = favi;
    });
    $scope.add = function() {
      $resource('/api/favorites').save($scope.house);
    }
  }
]);

app.controller('FavoritesCtrl', ['$scope', '$resource', 
  function($scope, $resource) {
    var Favis = $resource('/api/favorites');
    Favis.query(function(favis) {
      $scope.favis = favis;
    });
  }
]);