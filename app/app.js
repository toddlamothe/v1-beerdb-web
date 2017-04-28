(function () {
  'use strict';

  var BeerdbApp = angular.module('BeerDbApp', [
    'ui.bootstrap',
    'ConfigurationService',
    'BeerDbApp.BeerService',
    'BeerDbApp.GeoLocationService',
    'angularSpinner',
    'ngAside',
    'BeerdbApp.main',
    'BeerdbApp.beerMapLeaflet',
    'leaflet-directive'
  ]).config(function($logProvider) {
    $logProvider.debugEnabled(false);
  });

}());
