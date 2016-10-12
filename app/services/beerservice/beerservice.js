(function () {
  'use strict';


  angular.module('BeerDbApp.BeerService', [])
    .service('beerService', ['$log', '$http', 'APP_CONFIG', function($log, $http, APP_CONFIG) {
        $log.info('[beerService]');

        // Define service functions
        function getBrewery(searchParams) {
          console.log('  [getBrewery] searchParams: ', searchParams);
          var url = APP_CONFIG.breweryDbBaseUrl + 'breweries?name=' + encodeURI(searchParams.name);
          console.log('  [getBrewery] url = ', url);
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
