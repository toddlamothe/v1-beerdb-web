(function () {
  'use strict';

  angular.module('BeerdbApp.main', [])
    .component("main", {
          templateUrl: "components/main/main.html",
          controller: ['$scope', '$aside', '$log', function($scope, $aside, $log) {
            console.log('[main controller]');

            $scope.asideState = {
               open: false
             };

            $scope.openAside = function() {
             $aside.open({
                   templateUrl: 'components/beersearch/beerSearch.html',
                   placement: 'right',
                   size: 'sm',
                   controller: function($scope, beerService, NgMap, $log) {
                     console.log('[beerSearch controller]');
                     $scope.spinnerActive = false;
                     $scope.brewerySearchResults = {};
                     $scope.beerSearchResults = {};
                     $scope.locations = [];

                     $scope.brewerySearchParams = {
                       name: '',
                       isOrganic: false
                     };

                     $scope.breweryLocationSearchParams = {
                       city  : null,
                       state : null,
                       zip   : null
                     };

                     $scope.brewerySearch = function() {
                       $log.info('  [brewerySearch]');
                       $scope.spinner(true);
                       $scope.clearSearchResults();

                       beerService.getBrewery($scope.brewerySearchParams)
                         .success(function(data) {
                           $scope.brewerySearchResults = data.data;
                           $log.info('$scope.brewerySearchResults = ', $scope.brewerySearchResults);
                           if($scope.brewerySearchResults) {
                             $scope.buildBreweryLocationList();
                             beerService.refreshMap($scope.locations);
                           }
                           $scope.spinner(false);
                         })
                         .error(function() {
                           console.log('  call to beerService.getBrewery failed');
                           $scope.spinner(false);
                         });
                     };

                     $scope.breweryLocationSearch = function() {
                       $log.info('  [breweryLocationSearch]');
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
                   }
                 });
            }

          }]
    });
}());
