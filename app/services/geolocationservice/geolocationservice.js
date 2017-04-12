(function () {
  'use strict';


  angular.module('BeerDbApp.GeoLocationService', [])
    .service('geoLocationService', ['$log', '$http', 'APP_CONFIG', function($log, $http, APP_CONFIG) {
        $log.info('[geoLocationService]');
        var convertLatLonToZipCode = function(lat, lon, callback) {
          $log.info('convertLatLonToZipCode');
          // http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true
          var url = APP_CONFIG.get("reverseGeoCodeServiceUrl") + '?sensor=true' + buildLatLonToZipCodeQueryString(lat, lon);
          $log.info('url = ', url);
          $http.get(url).then(function successCallback(response) {
            $log.info('reverse geocode success!');
            if(response.data.results[0].address_components[7].short_name) {
              callback(response.data.results[0].address_components[7].short_name)
            }
            else {
              callback('Error detecting zip code from current location');
            }
          }, function errorCallback(response) {
            $log.info('reverse geocode FAIL!');
            return 'ERROR';
          });
        };

        function buildLatLonToZipCodeQueryString(lat, lon) {
          return '&latlng=' + lat + ',' + lon;
        }

        // Return functions as individual service calls
        return {
          convertLatLonToZipCode : convertLatLonToZipCode
        };

    }]);
}());
