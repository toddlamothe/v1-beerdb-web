(function () {
  'use strict';

  angular.module('BeerdbApp.beerSearch', [])
    .component("beerSearch", {
          templateUrl: "components/beersearch/beersearch.html",
          controller: ['$scope', 'beerService', function($scope, beerService) {
            console.log('[beerSearch controller]');
            var beerSearchController = this;
            this.favoriteBeer = {
              brewery : ""
            };

            beerService.getBrewery()
              .success(function(data) {
                console.log('success! data = ', data);
                beerSearchController.favoriteBeer = data.data;
              })
              .error(function() {
                console.log('  call to beerService.getBrewery failed');
              });

//            this.favoriteBeer.brewery = beerService.getBrewery().name;
          }]
    });
}());
