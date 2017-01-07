(function () {
  'use strict';

  angular.module("BeerdbApp.navbar", ['ConfigurationService'])
    .component("navbar", {
      templateUrl: 'components/navbar/navbar.html',
      controller: function($scope, APP_CONFIG) {
        console.log('[navbar]');
        $scope.appVersion = APP_CONFIG.appVersion();
      }
    });
}());
