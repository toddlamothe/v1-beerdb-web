(function () {
  'use strict';

  angular.module('BeerdbApp.beerSearch', [])
    .component("beerSearch", {
          templateUrl: "components/beersearch/beersearch.html",
          controller: ['$scope', 'beerService', function($scope, beerService) {
            console.log('[beerSearch controller]');
            var beerSearchController = this;
            $scope.favoriteBeer = {
              "name" : "loading..."
            };

            $scope.searchResults = {};

            $scope.searchParams = {
              name: "",
              isOrganic: false
            };

            $scope.brewerySearch = function() {
              console.log('  brewerySearch');
              $scope.searchResults = {};

              beerService.getBrewery($scope.searchParams)
                .success(function(data) {
                  console.log('  success!');
                  $scope.searchResults = data.data;
                })
                .error(function() {
                  console.log('  call to beerService.getBrewery failed');
                });
            };
          }]
    });
}());
