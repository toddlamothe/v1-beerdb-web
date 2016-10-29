(function () {
   'use strict';

   angular.module('ConfigurationService', [])
    .constant('APP_CONFIG', (function configurationBuilder() {
      var _environment = "azure";
      var _environments = {
          test: {
            config: {
              breweryDbBaseUrl: "test.com"
            }
          },
          localhost: {
            config: {
              breweryDbBaseUrl: "http://localhost:8010/services/beerdb/api/beerdb/"
            }
          },
          pc: {
            config: {
              breweryDbBaseUrl: "http://10.160.126.109:8010/services/beerdb/api/beerdb/"
            }
          },
          azure: {
            config: {
              breweryDbBaseUrl: "http://beerdbapi.azurewebsites.net/api/beerdb/"
            }
          }
        };

      var config = {
        testval: "test"
      };

      config.get = function(property) {
        return _environments[_environment].config[property];
      };

      return config;
    })());
}());
