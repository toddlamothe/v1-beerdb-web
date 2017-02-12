(function () {
  'use strict';


  angular.module('BeerDbApp.BeerService', [])
    .service('beerService', ['$log', '$http', 'APP_CONFIG', function($log, $http, APP_CONFIG) {
        $log.info('[beerService]');
        var mapRefreshCallbacks = [];
        var highlightBreweryCardCallbacks = [];

        function getBrewery(searchParams) {
          //var url = APP_CONFIG.get("breweryDbBaseUrl") + 'breweries?name=' + encodeURI(searchParams.name);
          var url = APP_CONFIG.get("breweryDbBaseUrl") + 'breweries?' + buildBrewerySearchQueryString(searchParams);
          $log.info('url = ', url);
          return $http.get(url);
        };

        function buildBrewerySearchQueryString(searchParams) {
          var searchQueryString = '';
          $log.info('search params: ', searchParams);
          // Brewery Name
          if (searchParams.name.length > 0) {
            searchQueryString.length==0 ?  searchQueryString = "name=" + encodeURI(searchParams.name) : searchQueryString += "&name=" + encodeURI(searchParams.name);
          }

          $log.info("brewery query string: ");
          $log.info(searchQueryString);

          return searchQueryString;
        };

        function getBreweryByLocation(searchParams) {

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

        var onMapRefresh = function(callback) {
          mapRefreshCallbacks.push(callback);
        }

        var refreshMap = function(locations) {
          for (var i = 0; i < mapRefreshCallbacks.length; i++)
            mapRefreshCallbacks[i](locations);
        }

        var onHighlightBreweryCard = function(callback) {
          highlightBreweryCardCallbacks.push(callback);
        }

        var highlightBreweryCard = function(elementId) {
          for (var i = 0; i < highlightBreweryCardCallbacks.length; i++)
            highlightBreweryCardCallbacks[i](elementId);
        }

        // Return functions as individual service calls
        return {
          onMapRefresh : onMapRefresh,
          refreshMap : refreshMap,
          onHighlightBreweryCard : onHighlightBreweryCard,
          highlightBreweryCard : highlightBreweryCard,
          getBrewery : getBrewery,
          getBeers : getBeers
        };

    }]);
}());
