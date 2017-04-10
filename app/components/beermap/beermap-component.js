(function () {
  'use strict';

    var mapComponent = angular.module('BeerdbApp.beerMap', []);

  mapComponent.component('beerMap', {
      templateUrl: 'components/beermap/beermap.html',
      controller: ['$scope', '$log', 'beerService', 'NgMap', function($scope, $log, beerService, NgMap) {
        $log.info('[beerMap]');
        $scope.centerPos = {
          lat: 39.5,
          lon: -98.35,
          zoom: 4
        }

        // Register callback for map toggle service event
        beerService.onMapRefresh(function(locations) {
          $log.info(' [onMapRefresh]');
          $scope.refreshMap(locations);
          $scope.centerMap(locations);
        });

        $scope.refreshMap = function(locations) {
          $log.info(' [refreshMap]');
          $scope.locations = locations;
        };

        $scope.showSearchDrawer = function() {
          beerService.setDrawerState(true);
        }

        $scope.centerMap = function(locations) {
          // Sample code swiped from https://ngmap.github.io/#/!map_fit_bounds.html
          var bounds = new google.maps.LatLngBounds();
          for (var i=0; i<locations.length; i++) {
            var latlng = new google.maps.LatLng(locations[i].pos[0], locations[i].pos[1]);
            bounds.extend(latlng);
          }
          //$log.info(' bounds = ', bounds);
          NgMap.getMap().then(function(map) {
            map.setCenter(bounds.getCenter());
            map.fitBounds(bounds);
          });        }

        $scope.onMarkerClicked = function(itemId) {
          $log.info( ' Marker clicked!');
          beerService.highlightBreweryCard(itemId);
        };

      }]
    })

}());
