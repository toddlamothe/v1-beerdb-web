(function () {
  'use strict';

  var BeerdbApp = angular.module('BeerDbApp', [
    'ui.bootstrap',
    'BeerdbApp.beerSearch',
    'BeerdbApp.searchCards',
    'BeerdbApp.navbar',
    'ConfigurationService',
    'BeerDbApp.BeerService',
    'angularSpinner',
    'ngMap'
  ]);

}());
