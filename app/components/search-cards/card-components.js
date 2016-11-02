(function () {
  'use strict';

  var cardComponents = angular.module('BeerdbApp.searchCards', []);

  cardComponents.component('beerCard', {
      templateUrl: 'components/search-cards/beercard.html',
      // bindings: {
      //   beer: '@'
      // },
      controller: ['$scope', '$log', function($scope, $log) {
        $log.info('[beerCard]');
      }]
    })

    cardComponents.component('breweryCard', {
        templateUrl: 'components/search-cards/brewerycard.html',
        // bindings: {
        //   brewery: '@'
        // },
        controller: ['$scope', '$log', function($scope, $log) {
          $log.info('[breweryCard]');
        }]
      })

}());
