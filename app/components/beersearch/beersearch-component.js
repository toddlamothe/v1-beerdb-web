(function () {
  'use strict';

  angular.module('BeerdbApp.beerSearch', ['BeerdbApp.searchCards'])
    .component("beerSearch", {
          templateUrl: "components/beersearch/beersearch.html",
          controller: ['$scope', 'beerService', 'NgMap', '$log', function($scope, beerService, NgMap, $log) {
            console.log('[beerSearch controller]');
            $scope.sidePanelActive = true;
            $scope.spinnerActive = false;
            $scope.brewerySearchResults = {};
            $scope.beerSearchResults = {};
            $scope.locations = [];

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
                  $log.info("Search results:");
                  $log.info(data);
                  $scope.brewerySearchResults = data.data;
                  $scope.buildBreweryLocationList();
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

            $scope.buildBreweryLocationList = function() {
              // Clear existing locations list
              $scope.locations = [];
              // Iterate through the list of brewery search results and extract a list of locations
              // $scope.locations
              var breweries = $scope.brewerySearchResults;
              var brewery;
              for (var b = 0; b < breweries.length; b++) {
                brewery = breweries[b];
                // Iterate through the list of locations for this brewery and append
                for (var l=0; l < brewery.locations.length; l++) {
                  if(brewery.locations[l].isPrimary == "Y") {
                    var location = {};
                    location.pos = [brewery.locations[l].latitude, brewery.locations[l].longitude];
                    location.name = brewery.locations[l].name;
                    if (brewery.images && brewery.images.icon) {
                      location.image = brewery.images.icon;
                    }
                    else {
                      location.image = 'assets/images/beer-small.png';
                    }
                    $scope.locations.push(location);
                  }
                };
                $log.info('$scope.locations: ', $scope.locations);
              };
            };
          }]
    });
}());
