(function () {
  'use strict';

  angular.module('BeerdbApp.beerSearch', ['BeerdbApp.searchCards'])
    .component("beerSearch", {
          templateUrl: "components/beersearch/beersearch.html",
          controller: ['$scope', 'beerService', 'NgMap', function($scope, beerService, NgMap) {
            console.log('[beerSearch controller]');
            $scope.sidePanelActive = false;
            $scope.spinnerActive = false;
            $scope.brewerySearchResults = {};
            $scope.beerSearchResults = {};

            $scope.positions = [
              {pos:[43.11, -75.21],name:1}, {pos:[43.22, -75.10],name:2},
              {pos:[43.33, -74.99],name:3}, {pos:[43.44, -74.88],name:4},
              {pos:[43.55, -74.77],name:5}, {pos:[43.66, -74.66],name:6}];


            // Register callback for map toggle service event
            beerService.onMapToggle(function() {
              $scope.toggleMap();
            });

            $scope.brewerySearchParams = {
              name: '',
              isOrganic: false
            };

            $scope.beerSearchParams = {
              name: ''
            };

            $scope.toggleMap = function() {
                $scope.sidePanelActive = !$scope.sidePanelActive;
            }

            $scope.brewerySearch = function() {
              console.log('  brewerySearch');
              $scope.spinner(true);
              $scope.clearSearchResults();

              beerService.getBrewery($scope.brewerySearchParams)
                .success(function(data) {
                  $scope.brewerySearchResults = data.data;
                  $scope.spinner(false);
                })
                .error(function() {
                  console.log('  call to beerService.getBrewery failed');
                  $scope.spinner(false);
                });
            };

            $scope.beerSearch = function() {
              console.log('  beerSearch');
              $scope.spinner(true);
              $scope.clearSearchResults();

              beerService.getBeers($scope.beerSearchParams)
                .success(function(data) {
                  $scope.beerSearchResults = data.data;
                  $scope.spinner(false);
                })
                .error(function() {
                  console.log('  call to beerService.getBeers failed');
                  $scope.spinner(false);
                });

            };

            $scope.spinner = function(showSpinner) {
              $scope.spinnerActive = showSpinner;
            };

            $scope.clearSearchResults = function() {
              $scope.beerSearchResults = {};
              $scope.brewerySearchResults = {};
            };

          }]
    });
}());
