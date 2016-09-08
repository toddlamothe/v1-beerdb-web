(function () {
  'use strict';


  angular.module('BeerDbApp.BeerService', [])
    .service('beerService', ['$log', '$http', 'APP_CONFIG', function($log, $http, APP_CONFIG) {
        $log.info('[beerService]');

        // Define service functions
        function getBrewery() {
          var url = APP_CONFIG.breweryDbBaseUrl + 'breweries?key=' + APP_CONFIG.breweryDbAPIKey + '&name=The%20Alchemist';
          console.log('url = ', url);
          return $http.get(url);
        }

        // function getBeer() {
        //   return { brewery: 'Six Point', name : 'Resin', abv: 9.2};
        // }

        // Return functions as individual service calls
        return {
          getBrewery : getBrewery
        };

    }]);
}());
