(function () {
   'use strict';

   angular.module('ConfigurationService', [])
    .constant('APP_CONFIG', (function configurationBuilder() {
      var _environment = "azure";
      var _version = 0.1;
      var _build = 32;
      var _environments = {
          test: {
            config: {
              breweryDbBaseUrl: "test.com"
            }
          },
          localhost: {
            config: {
              breweryDbBaseUrl: "http://localhost:8010/services/beerdb/api/beerdb/",
              reverseGeoCodeServiceUrl: "http://maps.googleapis.com/maps/api/geocode/json",
              defaultMapZoom: 15
            }
          },
          pc: {
            config: {
              breweryDbBaseUrl: "http://10.160.126.109:8010/services/beerdb/api/beerdb/",
              reverseGeoCodeServiceUrl: "http://maps.googleapis.com/maps/api/geocode/json",
              defaultMapZoom: 15
            }
          },
          azure: {
            config: {
              breweryDbBaseUrl: "https://beerdb.eastus.cloudapp.azure.com/api/api/beerdb/",
              reverseGeoCodeServiceUrl: "https://maps.googleapis.com/maps/api/geocode/json",
              defaultMapZoom: 16
            }
          },
          docker: {
            config: {
              breweryDbBaseUrl: "http://beerdb-win-dock.eastus.cloudapp.azure.com:8888/api/beerdb/",
              reverseGeoCodeServiceUrl: "http://maps.googleapis.com/maps/api/geocode/json",
              defaultMapZoom: 15
            }
          },
          techfest: {
            config: {
              breweryDbBaseUrl: "https://beerdb.eastus.cloudapp.azure.com/api/api/beerdb/",
              reverseGeoCodeServiceUrl: "http://maps.googleapis.com/maps/api/geocode/json",
              defaultMapZoom: 15
            }
          }
        };

      var config = {
        testval: "test"
      };

      config.get = function(property) {
        return _environments[_environment].config[property];
      };

      config.appVersion = function() {
        return _version + "." + _build;
      };

      return config;
    })());
}());
