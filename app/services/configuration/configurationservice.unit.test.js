(function () {
  'use strict';

  var $rootScope,
    APP_CONFIG = null;

  describe('ConfigurationService', function() {
    beforeEach(module('BeerDbApp'));

    beforeEach(inject(function($injector) {
      APP_CONFIG = $injector.get('APP_CONFIG');
    }));

    it('should pass', function() {
      expect(APP_CONFIG.get('breweryDbBaseUrl')).toBeDefined();
    });
  });
}());
