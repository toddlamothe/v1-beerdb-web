(function () {
  'use strict';

  var BeerdbApp = angular.module('BeerDbApp', [
    'ui.bootstrap',
    'ConfigurationService',
    'BeerDbApp.BeerService',
    'BeerDbApp.GeoLocationService',
    'angularSpinner',
    'ngMap',
    'ngAside',
    'BeerdbApp.main',
    'BeerdbApp.beerMap'
  ]);

}());
