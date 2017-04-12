(function () {
  'use strict';

  var BeerdbApp = angular.module('BeerDbApp', [
    'ui.bootstrap',
    'ConfigurationService',
    'BeerDbApp.BeerService',
    'angularSpinner',
    'ngMap',
    'ngAside',
    'ngCordova',
    'BeerdbApp.main',
    'BeerdbApp.beerMap'
  ]);

}());
