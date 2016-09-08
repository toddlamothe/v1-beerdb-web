(function () {
  'use strict';

  angular.module("BeerdbApp.navbar", [])
    .component("navbar", {
      templateUrl: 'components/navbar/navbar.html',
      controller: function() {
        console.log('[navbar]');
      }
    });
}());
