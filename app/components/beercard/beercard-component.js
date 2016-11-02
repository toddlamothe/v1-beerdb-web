(function () {
  'use strict';

  angular.module('BeerdbApp.searchCards', [])
    .component('beerCard', {
      templateUrl: 'components/beercard/beercard.html',
      controller: ['$scope', '$log', function($scope, $log) {
        $log.info('[beerCard]');
      }]
    })

}());
