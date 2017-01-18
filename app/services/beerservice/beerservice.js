(function () {
  'use strict';


  angular.module('BeerDbApp.BeerService', [])
    .service('beerService', ['$log', '$http', 'APP_CONFIG', function($log, $http, APP_CONFIG) {
        $log.info('[beerService]');
        var callbacks = [];

        // Define service functions

        function getBrewery(searchParams) {
          var url = APP_CONFIG.get("breweryDbBaseUrl") + 'breweries?name=' + encodeURI(searchParams.name);
          $log.info('url = ', url);
          return $http.get(url);
        };

        function getBeers(searchParams) {
          var url = APP_CONFIG.get("breweryDbBaseUrl") + 'beers?name=' + encodeURI(searchParams.name)
          $log.info('url = ', url);
          $log.info('url = ', url);
          return $http.get(url);
        };

        function appVersion() {
          var appVersion = APP_CONFIG.appVersion();
        };

        function toggleMap() {
          for (var i = 0; i < callbacks.length; i++)
            callbacks[i]();
        }

        //register listener
        var onMapToggle = function(callback) {
          callbacks.push(callback);
        }

        // Return functions as individual service calls
        return {
          onMapToggle : onMapToggle,
          toggleMap : toggleMap,
          getBrewery : getBrewery,
          getBeers : getBeers
        };

    }]);
}());
