(function () {
  'use strict';


  angular.module('BeerDbApp.BeerService', [])
    .service('beerService', ['$log', '$http', 'APP_CONFIG', function($log, $http, APP_CONFIG) {
        $log.info('[beerService]');
        var mapRefreshCallbacks = [];
        var highlightBreweryCardCallbacks = [];
        var drawerStateChangedCallbacks = [];
        var searchStartCallbacks = [];

        // THIS IS THE NEW FUNCTION
        function getBreweries(searchParams) {
          var url = APP_CONFIG.get("breweryDbBaseUrl") + 'breweries/locations?isClosed=n' + buildBreweriesSearchQueryString(searchParams);
          $log.info('url = ', url);
          return $http.get(url);
        }

        function buildBreweriesSearchQueryString(searchParams) {
          var searchQueryString = '';
          if (searchParams.state) {
            searchQueryString += "&state=" + encodeURI(searchParams.state);
          }
          if (searchParams.city) {
            searchQueryString += "&city=" + encodeURI(searchParams.city);
          }
          if (searchParams.zip) {
            searchQueryString += "&zip=" + encodeURI(searchParams.zip);
          }

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

        var onSetDrawerState = function(callback) {
          drawerStateChangedCallbacks.push(callback);
        }

        var setDrawerState = function(showDrawer) {
          $log.info('setDrawerState(', showDrawer, ')');
          for (var i = 0; i < drawerStateChangedCallbacks.length; i++)
            drawerStateChangedCallbacks[i](showDrawer);
        }

        var onStartSearch = function(callback) {
          searchStartCallbacks.push(callback);
        };

        var startSearch = function() {
          $log.info('startSearch');
          for (var i = 0; i < searchStartCallbacks.length; i++)
            searchStartCallbacks[i]();
        };

        // Return functions as individual service calls
        return {
          onMapRefresh : onMapRefresh,
          refreshMap : refreshMap,
          onHighlightBreweryCard : onHighlightBreweryCard,
          highlightBreweryCard : highlightBreweryCard,
          onSetDrawerState : onSetDrawerState,
          setDrawerState : setDrawerState,
          getBreweries : getBreweries,
          getBrewery : getBrewery,
          onStartSearch : onStartSearch,
          startSearch : startSearch
        };

    }]);
}());
