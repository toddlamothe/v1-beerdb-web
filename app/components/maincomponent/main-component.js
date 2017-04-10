(function () {
  'use strict';

  angular.module('BeerdbApp.main', [])
    .component("main", {
          templateUrl: "components/maincomponent/main.html",
          controller: ['$scope', '$aside', '$log', 'beerService', function($scope, $aside, $log, beerService) {
            console.log('[main controller]');

            // Wire up event handler so other components can send an event to open the drawer
            beerService.onSetDrawerState(function(showDrawer) {
              if (true == showDrawer) {
                $scope.openAside('right', false);
              }
            });

            $scope.openAside = function(position, backdrop) {
                $scope.asideState = {
                  open: true,
                  position: position
                };

                function postClose() {
                  $scope.asideState.open = false;
                }

                $aside.open({
                  templateUrl: 'components/beersearch/beerSearch.html',
                  placement: position,
                  size: 'sm',
                  backdrop: backdrop,
                  controller:  function($scope, $uibModalInstance, beerService) {

                    $scope.breweryLocationSearchParams = {
                      city  : null,
                      state : null,
                      zip   : null
                    };

                    $scope.cancelSearch = function(e) {
                      $uibModalInstance.dismiss();
                      e.stopPropagation();
                    };

                    $scope.brewerySearch = function(e) {
                      $log.info('  brewerySearch()');
                      $uibModalInstance.close();
                      e.stopPropagation();

                      $scope.spinner(true);
                      $scope.clearSearchResults();

                      beerService.getBreweries($scope.breweryLocationSearchParams)
                        .success(function(data) {
                          $scope.brewerySearchResults = data.data;
                          $scope.buildBreweryLocationList();
                          beerService.refreshMap($scope.locations);
                          $scope.spinner(false);
                        })
                        .error(function() {
                          console.log('  call to beerService.getBreweryByLocation failed');
                          $scope.spinner(false);
                        });

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
                      };
                    };

                    $scope.spinner = function(showSpinner) {
                      $scope.spinnerActive = showSpinner;
                    };

                    $scope.clearSearchResults = function() {
                      $scope.beerSearchResults = {};
                      $scope.brewerySearchResults = {};
                    };

                  }
                }).result.then(postClose, postClose);
              };

              $scope.openAside('right', false)

          }]
    });
}());
