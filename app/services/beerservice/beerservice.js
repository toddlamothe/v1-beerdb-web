(function () {
  'use strict';


  angular.module('BeerDbApp.BeerService', [])
    .service('beerService', ['$log', '$http', 'APP_CONFIG', function($log, $http, APP_CONFIG) {
        $log.info('[beerService]');

        // Define service functions

        function getBrewery(searchParams) {
          var url = APP_CONFIG.breweryDbBaseUrl + 'breweries?name=' + encodeURI(searchParams.name);
          $log.info('url = ', url);
          return $http.get(url);
        };

        function getBeers(searchParams) {
          var url = APP_CONFIG.breweryDbBaseUrl + 'beers?name=' + encodeURI(searchParams.name)
          $log.info('url = ', url);
          $log.info('url = ', url);
          return $http.get(url);
        };

        // Return functions as individual service calls
        return {
          getBrewery : getBrewery,
          getBeers : getBeers
        };

    }]);
}());
