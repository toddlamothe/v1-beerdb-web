(function () {
  'use strict';

  BeerdbApp.module('BeerdbApp.searchCards', [])
    .component('beerCard', {
      templateUrl: 'components/beercard/beercard.html',
      // bindings: {
      //   beer: '@'
      // },
      controller: ['$scope', '$log', function($scope, $log) {
        $log.info('[beerCard]');
      }]
    })

}());
