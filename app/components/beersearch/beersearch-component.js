(function () {
  'use strict';

  angular.module('BeerdbApp.beerSearch', ['BeerdbApp.searchCards'])
    .component("beerSearch", {
          templateUrl: "components/beersearch/beersearch.html",
          controller: ['$scope', 'beerService', function($scope, beerService) {
            console.log('[beerSearch controller]');
            var beerSearchController = this;
            $scope.spinnerActive = false;

            $scope.brewerySearchResults = {};
            $scope.beerSearchResults = {};

            $scope.brewerySearchParams = {
              name: '',
              isOrganic: false
            };

            $scope.beerSearchParams = {
              name: ''
            };

            $scope.showDetails = false;

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
