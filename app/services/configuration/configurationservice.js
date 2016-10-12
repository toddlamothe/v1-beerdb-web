(function () {
   'use strict';

   angular.module('ConfigurationService', [])
    .constant('APP_CONFIG', {
      //breweryDbBaseUrl: "http://localhost:8010/services/beerdb/api/beerdb/"
      breweryDbBaseUrl: "http://10.160.126.109:8010/services/beerdb/api/beerdb/"
    });
}());
