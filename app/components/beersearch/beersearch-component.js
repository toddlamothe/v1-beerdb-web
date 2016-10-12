(function () {
  'use strict';

  angular.module('BeerdbApp.beerSearch', [])
    .component("beerSearch", {
          templateUrl: "components/beersearch/beersearch.html",
          controller: ['$scope', 'beerService', function($scope, beerService) {
            console.log('[beerSearch controller]');
            var beerSearchController = this;
            $scope.spinnerActive = false;

            $scope.searchResults = {};

            $scope.searchParams = {
              name: "",
              isOrganic: false
            };

            $scope.brewerySearch = function() {
              console.log('  brewerySearch');
              $scope.spinner(true);
              $scope.searchResults = {};

              beerService.getBrewery($scope.searchParams)
                .success(function(data) {
                  console.log('  success!');
                  $scope.searchResults = data.data;
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
              $scope.searchResults = {};

              // beerService.getBrewery($scope.searchParams)
              //   .success(function(data) {
              //     console.log('  success!');
              //     $scope.searchResults = data.data;
              //     $scope.spinner(false);
              //   })
              //   .error(function() {
              //     console.log('  call to beerService.getBrewery failed');
              //     $scope.spinner(false);
              //   });

            };

            $scope.spinner = function(showSpinner) {
              $scope.spinnerActive = showSpinner;
            };
          }]
    });
}());
