(function () {
  'use strict';

    var mapComponent = angular.module('BeerdbApp.beerMapLeaflet', []);

  mapComponent.component('beerMapLeaflet', {
    templateUrl: 'components/beermap-leaflet/beermap-leaflet.html',
    controller: ['$scope', '$log', 'beerService', 'leafletData', 'APP_CONFIG', function($scope, $log, beerService, leafletData, APP_CONFIG) {
      $log.info('[beerMapLeafletController]');
      $scope.spinnerActive = false;

      $scope.center = {
          autoDiscover: true,
          zoom: APP_CONFIG.get("defaultMapZoom")
      }

      beerService.onStartSearch(function() {
        $log.info(' [onStartSearch]');
        $scope.spinnerActive = true;
      })

      // Register callback for map toggle service event
      beerService.onMapRefresh(function(locations) {
        $log.info(' [onMapRefresh]');
        $scope.refreshMap(locations);
        $scope.centerMap(locations);
        $scope.spinnerActive = false;
      });

      $scope.refreshMap = function(locations) {
        $log.info(' [refreshMap]');
        $scope.locations = locations;
        $scope.center.zoom = 12;
      };

      $scope.showSearchDrawer = function() {
        beerService.setDrawerState(true);
      }

      $scope.centerMap = function(locations) {
        leafletData.getMap().then(function(map) {
          var latlngs = [];
          for (var i in locations) {
            latlngs.push({
              lat: locations[i].lat,
              lng: locations[i].lng
            });
          }
          map.fitBounds(latlngs);
        });
      };

      $scope.onMarkerClicked = function(itemId) {
        $log.info( ' Marker clicked!');
      };

      $scope.spinner = function(showSpinner) {
        $scope.spinnerActive = showSpinner;
      };

    }]
  })

}());
