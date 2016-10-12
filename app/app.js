(function () {
  'use strict';

  var BeerdbApp = angular.module('BeerDbApp', [
    'ui.bootstrap',
    'BeerdbApp.beerSearch',
    'BeerdbApp.navbar',
    'ConfigurationService',
    'BeerDbApp.BeerService',
    'angularSpinner'
  ]);

}());
