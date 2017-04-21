(function () {
  'use strict';

  var geoLocationService = null;

  describe('geoLocationService', function() {
    beforeEach(module('BeerDbApp'));

    beforeEach(inject(function($injector) {
      geoLocationService = $injector.get('geoLocationService');
    }));

    it('should be true', function() {
        expect(true).toBe(false);
    });

  });

}());
