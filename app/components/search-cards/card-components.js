(function () {
  'use strict';

  var cardComponents = angular.module('BeerdbApp.searchCards', []);

  cardComponents.component('beerCard', {
      templateUrl: 'components/search-cards/beercard.html',
      bindings: {
        beer: '@'
      },
      controller: ['$scope', '$log', function($scope, $log) {
        $log.info('[beerCard]');
        $scope.beer = JSON.parse(this.beer);
      }]
    })

    cardComponents.component('breweryCard', {
        templateUrl: 'components/search-cards/brewerycard.html',
        bindings: {
            brewery: '@'
        },
        controller: ['$scope', '$log', function($scope, $log) {
          $log.info('[breweryCard]');
          $scope.brewery = JSON.parse(this.brewery);
        }]
      })

}());
