(function () {
  'use strict';

  var mapComponent = angular.module('BeerdbApp.beerMap', []);

  mapComponent.component('beerMap', {
      templateUrl: 'components/beermap/beermap.html',
      bindings: {
        items: '@'
      },
      controller: ['$scope', '$log', 'beerService', function($scope, $log, beerService) {
        $log.info('[beerMap]');
        $scope.searchItems = JSON.parse(this.items);
      }]
    })

}());
