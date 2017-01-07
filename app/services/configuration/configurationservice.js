(function () {
   'use strict';

   angular.module('ConfigurationService', [])
    .constant('APP_CONFIG', (function configurationBuilder() {
      var _environment = "docker";
      var _version = 0.1;
      var _build = 1;
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
          },
          docker: {
            config: {
              breweryDbBaseUrl: "http://beerdb-win-dock.eastus.cloudapp.azure.com:8888/api/beerdb/"
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
