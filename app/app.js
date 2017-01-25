(function () {
  'use strict';

  var BeerdbApp = angular.module('BeerDbApp', [
    'ui.bootstrap',
    'BeerdbApp.beerSearch',
    'BeerdbApp.searchCards',
    'BeerdbApp.navbar',
    'BeerdbApp.beerMap',
    'ConfigurationService',
    'BeerDbApp.BeerService',
    'angularSpinner',
    'ngMap'
  ]);

}());
