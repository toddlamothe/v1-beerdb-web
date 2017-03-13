(function () {
  'use strict';


  angular.module('BeerDbApp.BeerService', [])
    .service('beerService', ['$log', '$http', 'APP_CONFIG', function($log, $http, APP_CONFIG) {
        $log.info('[beerService]');
        var mapRefreshCallbacks = [];
        var highlightBreweryCardCallbacks = [];

        // THIS IS THE NEW FUNCTION
        function getBreweries(searchParams) {
          var url = APP_CONFIG.get("breweryDbBaseUrl") + 'breweries/locations?isClosed=n' + buildBreweriesSearchQueryString(searchParams);
          $log.info('url = ', url);
          return $http.get(url);
        }

        function buildBreweriesSearchQueryString(searchParams) {
          var searchQueryString = '';
          $log.info('search params: ', searchParams);
          $log.info("brewery location query string: ");
          if (searchParams.state) {
            searchQueryString += "&state=" + encodeURI(searchParams.state);
          }
          if (searchParams.city) {
            searchQueryString += "&city=" + encodeURI(searchParams.city);
          }
          if (searchParams.zip) {
            searchQueryString += "&zip=" + encodeURI(searchParams.zip);
          }
          $log.info(searchQueryString);

          return searchQueryString;
        };

        function getBrewery(searchParams) {
          var url = APP_CONFIG.get("breweryDbBaseUrl") + 'breweries?' + buildBrewerySearchQueryString(searchParams);
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
          var url = APP_CONFIG.get("breweryDbBaseUrl") + 'breweries/near?' + buildBrewerySearchByLocationQueryString(searchParams);
          $log.info('url = ', url);
          return $http.get(url);
        };

        function buildBrewerySearchByLocationQueryString(searchParams) {
          var searchQueryString = '';
          $log.info('search params: ', searchParams);
          // Brewery Name
          searchQueryString = "lat=" + encodeURI(searchParams.lat) + "&lon=" + encodeURI(searchParams.lon) + "&radius=" + encodeURI(searchParams.radius);

          $log.info("brewery location query string: ");
          $log.info(searchQueryString);

          return searchQueryString;
        };

        // function getBeers(searchParams) {
        //   var url = APP_CONFIG.get("breweryDbBaseUrl") + 'beers?name=' + encodeURI(searchParams.name)
        //   $log.info('url = ', url);
        //   $log.info('url = ', url);
        //   return $http.get(url);
        // };

        function appVersion() {
          var appVersion = APP_CONFIG.appVersion();
        };

        var onMapRefresh = function(callback) {
          mapRefreshCallbacks.push(callback);
        }

        var refreshMap = function(locations, centerPos, radius) {
          for (var i = 0; i < mapRefreshCallbacks.length; i++)
            mapRefreshCallbacks[i](locations, centerPos, radius);
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
          getBreweries : getBreweries,
          getBrewery : getBrewery,
          getBreweryByLocation : getBreweryByLocation
          // getBeers : getBeers
        };

    }]);
}());
