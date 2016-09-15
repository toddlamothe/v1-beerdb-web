(function () {
  'use strict';


  angular.module('BeerDbApp.BeerService', [])
    .service('beerService', ['$log', '$http', 'APP_CONFIG', function($log, $http, APP_CONFIG) {
        $log.info('[beerService]');

        // Define service functions
        function getBrewery() {
          //var url = APP_CONFIG.breweryDbBaseUrl + 'breweries?key=' + APP_CONFIG.breweryDbAPIKey + '&name=The%20Alchemist';
          var url = APP_CONFIG.breweryDbBaseUrl + 'breweries';
          console.log('  url = ', url);
          return $http.get(url);
        };

        function getBeers() {
          return $http.get('nothing.com');
        };

        // Return functions as individual service calls
        return {
          getBrewery : getBrewery,
          getBeers : getBeers
        };

    }]);
}());
