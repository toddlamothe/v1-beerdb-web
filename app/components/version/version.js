'use strict';

angular.module('beerdb.version', [
  'beerdb.version.interpolate-filter',
  'beerdb.version.version-directive'
])

.value('version', '0.1');
