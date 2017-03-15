(function () {
  'use strict';

  var BeerdbApp = angular.module('BeerDbApp', [
    'ui.bootstrap',
    'BeerdbApp.beerSearch',
    'BeerdbApp.searchCards',
    'BeerdbApp.beerMap',
    'ConfigurationService',
    'BeerDbApp.BeerService',
    'angularSpinner',
    'ngMap'
  ]);

}());
