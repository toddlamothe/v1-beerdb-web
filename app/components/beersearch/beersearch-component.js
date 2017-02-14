(function () {
  'use strict';

  angular.module('BeerdbApp.beerSearch', ['BeerdbApp.searchCards', 'BeerdbApp.beerMap'])
    .component("beerSearch", {
          templateUrl: "components/beersearch/beersearch.html",
          controller: ['$scope', 'beerService', 'NgMap', '$log', function($scope, beerService, NgMap, $log) {
            console.log('[beerSearch controller]');
            $scope.sidePanelActive = true;
            $scope.spinnerActive = false;
            $scope.brewerySearchResults = {};
            $scope.beerSearchResults = {};
            $scope.locations = [];

            $scope.brewerySearchParams = {
              name: '',
              isOrganic: false
            };

            $scope.brewerySearchByLocationParams = {
              lat: '44.5',
              lon: '-72.577',
              radius: '25'
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
                  $log.info('brewerySearchResults = ', $scope.brewerySearchResults);
                  $scope.buildBreweryLocationList();
                  beerService.refreshMap($scope.locations);
                  $scope.spinner(false);
                })
                .error(function() {
                  console.log('  call to beerService.getBrewery failed');
                  $scope.spinner(false);
                });
            };

            $scope.brewerySearchByLocation = function() {
              console.log('  brewerySearchByLocation');
              $scope.spinner(true);
              $scope.clearSearchResults();

              beerService.getBreweryByLocation($scope.brewerySearchByLocationParams)
                .success(function(data) {
                  $scope.brewerySearchResults = data.data;
                  $log.info('brewerySearchResults = ', $scope.brewerySearchResults);
                  $scope.buildBreweryLocationList();
                  beerService.refreshMap($scope.locations);
                  $scope.spinner(false);
                })
                .error(function() {
                  console.log('  call to beerService.getBreweryByLocation failed');
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
              var breweries = $scope.brewerySearchResults;
              var brewery;
              for (var b = 0; b < breweries.length; b++) {
                brewery = breweries[b];
                // Iterate through the list of locations for this brewery and append
                for (var l=0; l < brewery.locations.length; l++) {
                  $log.info('brewery.locations[l].isPrimary = ', brewery.locations[l].isPrimary);
                  if(brewery.locations[l].isPrimary == "Y") {
                    var location = {};
                    location.id = brewery.id;
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
                //$log.info('$scope.locations: ', $scope.locations);
              };
            };
          }]
    });
}());
