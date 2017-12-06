var app = angular.module('Realtor', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/house/add', {
      templateUrl: 'partials/house-form-add.html',
      controller: 'AddHouseCtrl'
    })
    .when('/house/:id', {
      templateUrl: 'partials/house-detail.html',
      controller: 'HouseDetailCtrl'
    })
    .when('/admin', {
      templateUrl: 'partials/admin.html',
      controller: 'HomeCtrl'
    })
    .when('/favorites', {
      templateUrl: 'partials/favorites.html',
      controller: 'FavoritesCtrl'
    })
    .when('/house/edit/:id', {
      templateUrl: 'partials/house-form-edit.html',
      controller: 'EditHouseCtrl'
    })
    .when('/house/delete/:id', {
      templateUrl: 'partials/house-delete.html',
      controller: 'DeleteHouseCtrl'
    })
    .when('/contact', {
      templateUrl: 'partials/contact.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', '$location',
  function($scope, $resource, $location) {
    var Houses = $resource('/api/houses');
    var Search = $resource('/api/search/:key', { key: '@_key'});
    if (!$scope.keyword) {
      Houses.query(function(houses) {
        $scope.houses = houses;
      });
    }

    $scope.search = function() {
      if ($scope.keyword == '') {
        Houses.query(function(houses) {
          $scope.houses = houses;
        });
      } else {
        Search.query({ key: $scope.keyword }, function(houses) {
          $scope.houses = houses;
        });
      }
    };
    
    $scope.addhouse = function() {
      $location.path('/house/add');
    };
  }
]);

app.controller('HouseDetailCtrl', ['$scope', '$resource', '$route', '$routeParams', '$location',
  function($scope, $resource, $route, $routeParams, $location) {	
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
    };
    $scope.remove = function() {
      Favi.delete({ id: $routeParams.id });
      $route.reload();
    };
    $scope.contact = function() {
      $location.path('/contact');
    };
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

app.controller('SearchCtrl', ['$scope', '$resource',
  function($scope, $resource) { 
    var Searchresult = $resource('/api/search'); 
    Searchresult.query(function(sear) {
      $scope.sear = sear;
    });
  }
]);

app.controller('AddHouseCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            if($scope.house.address){
                var Houses = $resource('/api/houses');
                Houses.save($scope.house, function(){
                    $location.path('/admin');
                });
            }
        };
        $scope.back = function(){
            $location.path('/admin');
        };
    }]);

app.controller('EditHouseCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){   
        var Houses = $resource('/api/houses/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });
        Houses.get({ id: $routeParams.id }, function(house){
            $scope.house = house;
        });
        $scope.update = function(){
            if($scope.house.address){
                Houses.update($scope.house, function(){
                    $location.path('/admin');
                });
            }
        };
        $scope.back = function(){
            $location.path('/admin');
        };

    }]);

app.controller('DeleteHouseCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Houses = $resource('/api/houses/:id');
        Houses.get({ id: $routeParams.id }, function(house){
            $scope.house = house;
        })
        $scope.delete = function(){
            Houses.delete({ id: $routeParams.id }, function(house){
                $location.path('/admin');
            });
        };
        $scope.back = function(){
            $location.path('/admin');
        }
    }]);