(function () {
  'use strict';


  angular.module('BeerDbApp.GeoLocationService', [])
    .service('geoLocationService', ['$log', '$http', 'APP_CONFIG', function($log, $http, APP_CONFIG) {
        $log.info('[geoLocationService]');
        var convertLatLonToZipCode = function(lat, lon, callback) {
          $log.info('convertLatLonToZipCode');
          // http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true
          var url = APP_CONFIG.get("reverseGeoCodeServiceUrl") + '?sensor=true' + buildLatLonToZipCodeQueryString(lat, lon);
          $http.get(url).then(function successCallback(response) {
            $log.info('reverse geocode success!');
            // Iterate through the address componetns
            // Find the one where "types" = postal_code and return the "short_name" property
            var zipCode;
            for (var x=0;x<response.data.results[0].address_components.length;x++) {
              if (response.data.results[0].address_components[x].types == "postal_code") {
                zipCode = response.data.results[0].address_components[x].short_name
              }
            }
            if(zipCode) {
              callback(zipCode)
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

        function userMediaSupported() {
          //return navigator.getUserMedia;
          return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
        }

        function geolocationSupported() {
          return navigator.geolocation;
        }

        // Return functions as individual service calls
        return {
            convertLatLonToZipCode : convertLatLonToZipCode,
            userMediaSupported : userMediaSupported,
            geolocationSupported : geolocationSupported
        };

    }]);
}());
