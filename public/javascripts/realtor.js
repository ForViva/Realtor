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

app.controller('HouseDetailCtrl', ['$scope', '$resource', '$route', '$routeParams',
  function($scope, $resource, $route, $routeParams) {	
    var Houses = $resource('/api/houses/:id', { id: '@_id' });
    var Favi = $resource('/api/favorites/:id', { id: '@_id' });
    Houses.get({ id: $routeParams.id }, function(house) {
      $scope.house = house;
    });
    Favi.get({ id: $routeParams.id }, function(favi) {
      $scope.isFavi = (favi._id != null);
    });
    $scope.add = function() {
      $resource('/api/favorites').save($scope.house);
      $route.reload();
    }
    $scope.remove = function() {
      Favi.delete({ id: $routeParams.id });
      $route.reload();
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