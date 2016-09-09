(function () {
   'use strict';

   angular.module('ConfigurationService', [])
    .constant('APP_CONFIG', {
      breweryDbBaseUrl: "http://localhost:4494/api/beerdb/"
        // breweryDbBaseUrl: "http://api.brewerydb.com/v2/",
        // breweryDbAPIKey: " 8ee12a2f196eb183914740dbbb5ccfff" // "793f64a07905f464a63d0312cf00eefe"
    });
}());
