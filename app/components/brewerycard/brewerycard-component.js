(function () {
  'use strict';

  angular.module('BeerdbApp.searchCards', [])
    .component('breweryCard', {
      templateUrl: 'components/brewerycard/brewerycard.html',
      controller: ['$scope', '$log', function($scope, $log) {
        $log.info('[breweryCard]');
      }]
    })

}());
