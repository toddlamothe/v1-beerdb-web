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

            beerService.getBrewery()
              .success(function(data) {
                console.log('  success! brewery name = ', data.data[0].name);
                $scope.favoriteBeer = data.data[0];
              })
              .error(function() {
                console.log('  call to beerService.getBrewery failed');
              });

//            this.favoriteBeer.brewery = beerService.getBrewery().name;
          }]
    });
}());
