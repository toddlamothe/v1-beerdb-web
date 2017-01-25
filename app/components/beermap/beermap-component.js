(function () {
  'use strict';

    var mapComponent = angular.module('BeerdbApp.beerMap', []);

  mapComponent.component('beerMap', {
      templateUrl: 'components/beermap/beermap.html',
      controller: ['$scope', '$log', 'beerService', function($scope, $log, beerService) {
        $log.info('[beerMap]');

        // Register callback for map toggle service event
        beerService.onMapRefresh(function(locations) {
          $log.info(' [onMapRefresh]');
          $scope.refreshMap(locations);
        });

        $scope.refreshMap = function(locations) {
          $log.info(' [refreshMap]');
          $scope.locations = locations;
          if ($scope.locations && $scope.locations.length > 0) {
            $scope.locations = $scope.locations;
          };
        }
      }]
    })

}());