'use strict';

describe('beerdb.version module', function() {
  beforeEach(module('beerdb.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
