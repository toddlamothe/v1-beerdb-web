(function () {
  'use strict';

  var cardComponents = angular.module('BeerdbApp.searchCards', []);

  cardComponents.component('beerCard', {
      templateUrl: 'components/search-cards/beercard.html',
      bindings: {
        beer: '@'
      },
      controller: ['$scope', '$log', 'beerService', function($scope, $log, beerService) {
        $log.info('[beerCard]');
        $scope.beer = JSON.parse(this.beer);
      }]
    })

    cardComponents.component('breweryCard', {
        templateUrl: 'components/search-cards/brewerycard.html',
        bindings: {
            brewery: '@'
        },
        controller: ['$scope', '$log', 'beerService', '$anchorScroll', '$location', function($scope, $log, beerService, $anchorScroll, $location) {
          $log.info('[breweryCard]');
          $scope.breweryDescriptionMin = 100;
          $scope.breweryDescriptionMax = 10000;
          $scope.charLimit = $scope.breweryDescriptionMin;
          $scope.brewery = JSON.parse(this.brewery);

          $scope.setFocus = function(elementId) {
            $location.hash(elementId);
            $anchorScroll();
          };

          beerService.onHighlightBreweryCard($scope.setFocus);

          $scope.readMore = function() {
            $scope.charLimit = $scope.breweryDescriptionMax;
          }

          $scope.readLess = function() {
            $scope.charLimit = $scope.breweryDescriptionMin;
          }

        }]
      })

}());
