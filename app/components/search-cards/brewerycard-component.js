(function () {
  'use strict';

  BeerdbApp.module('BeerdbApp.searchCards', [])
    .component('breweryCard', {
      templateUrl: 'components/brewerycard/brewerycard.html',
      // bindings: {
      //   brewery: '@'
      // },
      controller: ['$scope', '$log', function($scope, $log) {
        $log.info('[breweryCard]');
      }]
    })

}());
