(function () {
  'use strict';

  var $rootScope,
    APP_CONFIG = null;

  describe('ConfigurationService', function() {
    beforeEach(module('BeerDbApp'));

    beforeEach(inject(function($injector) {
      APP_CONFIG = $injector.get('APP_CONFIG');
    }));

    it('should return a breweryDb base url', function() {
      expect(APP_CONFIG.get('breweryDbBaseUrl')).toBeDefined();
    });
  });
}());
