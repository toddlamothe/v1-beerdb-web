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
                  backdrop: true,
                  controller:  ['$scope', '$uibModalInstance', 'beerService', 'geoLocationService', function($scope, $uibModalInstance, beerService, geoLocationService) {
                    /*
                      This is the controller for the beersearch component.
                      Use of the angular aside component requires the controller to be included here
                      To Do: move this controller to its own file and module
                    */
                    $log.info(' [AsideController]');
                    $scope.currentStatus = "waiting...";

                    if (navigator.geolocation)
                      $scope.locationServicesEnabled = true;
                    else
                      $scope.locationServicesEnabled = false;

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
                      beerService.startSearch();
                      $uibModalInstance.close();
                      e.stopPropagation();

                      $scope.spinner(true);
                      $scope.clearSearchResults();

                      beerService.getBreweries($scope.breweryLocationSearchParams)
                        .success(function(data) {
                          $scope.brewerySearchResults = data.data;
                          // $scope.buildBreweryLocationList();
                          $scope.buildBreweryLocationListLeaflet();
                          beerService.refreshMap($scope.locations);
                          $scope.currentStatus = "getBreweries success: number of breweries = ", $scope.locations.length;
                          $scope.spinner(false);
                        })
                        .error(function() {
                          console.log('  call to beerService.getBreweryByLocation failed');
                          $scope.currentStatus = "getBreweries FAIL"
                          $scope.spinner(false);
                        });

                    };

                    $scope.buildBreweryLocationListLeaflet = function() {
                      $log.info( '  [buildBreweryLocationListLeaflet]');
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

                            var marker = {
                              lat: brewery.locations[l].latitude,
                              lng: brewery.locations[l].longitude,
                              message: $scope.buildToolTipHtml(brewery),
                              focus: false,
                            };
                            if (brewery.images && brewery.images.icon) {
                              marker.icon = {
                                iconUrl: brewery.images.icon,
                                iconSize: [45, 45]
                              };
                            }
                            else {
                              marker.icon = {
                                iconUrl: 'assets/images/Beer-icon-55x55.png',
                                iconSize: [45, 45]
                              };
                            }

                            $scope.locations.push(marker);
                          }
                        };
                      };
                    };

                    $scope.buildToolTipHtml = function(brewery) {
                      var html = "<b><a target='_blank' href='" + brewery.website + "'>" + brewery.name + "</a></b>";
                      if (brewery.established)
                        html+= " <span class='pull-right'>Est " + brewery.established + "</span>";
                      if (brewery.description)
                        html+= "<br>" + brewery.description;
                      return html;
                    }

                    $scope.findBreweriesNearMe = function(e) {
                      if (navigator.geolocation) {
                        $log.info('Loation services available');
                        beerService.startSearch();
                        //$uibModalInstance.close();
                        e.stopPropagation();
                        $scope.locationServicesEnabled = true;
                          navigator.geolocation.getCurrentPosition(function(position){
                            $scope.$apply(function(){
                              $scope.position = position;
                              var lat = position.coords.latitude;
                              var lon = position.coords.longitude;

                              geoLocationService.convertLatLonToZipCode(lat,lon, function(zipCode) {
                                $log.info('zipCode = ', zipCode)
                                $scope.currentLocationZip = zipCode;
                                // Now look for breweries near this zip code
                                $scope.breweryLocationSearchParams = {
                                  city  : null,
                                  state : null,
                                  zip   : zipCode
                                };
                                $scope.brewerySearch(e);
                              });
                            });
                          });
                        }
                        else {
                          $log.info('Location services not available');
                          $scope.locationServicesEnabled = false;
                        }
                    }

                    $scope.spinner = function(showSpinner) {
                      $scope.spinnerActive = showSpinner;
                    };

                    $scope.clearSearchResults = function() {
                      $scope.beerSearchResults = {};
                      $scope.brewerySearchResults = {};
                    };

                  }]
                }).result.then(postClose, postClose);
              };

              $scope.openAside('right', false)

          }]
    });
}());
