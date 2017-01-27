(function () {
  'use strict';

  var cardComponents = angular.module('BeerdbApp.searchCards', []);

  cardComponents.component('beerCard', {
      templateUrl: 'components/search-cards/beercard.html',
      bindings: {
        beer: '@'
      },
      controller: ['$scope', '$log', 'beerService', function($scope, $log, beerService) {
        $log.info('[beerCard]');
        $scope.beer = JSON.parse(this.beer);
      }]
    })

    cardComponents.component('breweryCard', {
        templateUrl: 'components/search-cards/brewerycard.html',
        bindings: {
            brewery: '@'
        },
        controller: ['$scope', '$log', 'beerService', '$anchorScroll', '$location', function($scope, $log, beerService, $anchorScroll, $location) {
          $log.info('[breweryCard]');
          $scope.brewery = JSON.parse(this.brewery);

          $scope.setFocus = function(elementId) {
            $log.info("setting focus to 14 Star:");
            $location.hash(elementId);
            $anchorScroll();
          };

          beerService.onHighlightBreweryCard($scope.setFocus);

        }]
      })

}());
