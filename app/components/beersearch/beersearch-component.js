(function () {
  'use strict';

  angular.module('BeerdbApp.beerSearch', [])
    .component("beerSearch", {
          templateUrl: "components/beersearch/beersearch.html",
          controller: ['$scope', 'beerService', function($scope, beerService) {
            console.log('[beerSearch controller]');
            this.favoriteBeer = {};

            beerService.getBrewery()
              .success(function(data) {
                console.log('success! data = ', data);
              })
              .error(function() {
                console.log('  getBrewery failed');
              });

//            this.favoriteBeer.brewery = beerService.getBrewery().name;
          }]
    });
}());
