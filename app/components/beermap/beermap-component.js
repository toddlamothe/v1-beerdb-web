(function () {
  'use strict';

    var mapComponent = angular.module('BeerdbApp.beerMap', []);

  mapComponent.component('beerMap', {
      templateUrl: 'components/beermap/beermap.html',
      controller: ['$scope', '$log', 'beerService', function($scope, $log, beerService) {
        $log.info('[beerMap]');
        $scope.centerPos = {
          lat: 39.5,
          lon: -98.35,
          zoom: 4
        }

        // Register callback for map toggle service event
        beerService.onMapRefresh(function(locations, centerPos, radius) {
          $log.info(' [onMapRefresh]');
          $scope.refreshMap(locations);
          if (centerPos) {
            centerPos.zoom = $scope.convertRadiusToZoom(radius);
            $scope.centerPos = centerPos;
          }
        });

        $scope.refreshMap = function(locations) {
          $log.info(' [refreshMap]');
          $scope.locations = locations;
        };

        $scope.onMarkerClicked = function(itemId) {
          $log.info( ' Marker clicked!');
          beerService.highlightBreweryCard(itemId);
        };

        $scope.convertRadiusToZoom = function(radius) {
          var zoom;
          if (radius < 25) zoom = 10
          else if (radius < 50) zoom = 9
          else if (radius < 100) zoom = 8
          else if (radius < 500) zoom = 6
          else zoom = 4;

          return zoom;
        };

      }]
    })

}());
