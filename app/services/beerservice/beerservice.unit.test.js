(function () {
  'use strict';

  var beerService = null,
    $httpBackend = null,
    APP_CONFIG = null,
    mockBreweryPayload = {
        "currentPage": 1,
        "numberOfPages": 1,
        "totalResults": 1,
        "data": [
          {
            "id": "pj4HJk",
            "name": "Test Brewery",
            "nameShortDisplay": "Test Brewery",
            "description": "The Alchemist is a 7 barrel brew pub specializing in hand-crafted  beer and casual pub fare.  All of our ales flow directly from our  basement brewery, which was designed and installed by our brewer and  co-proprietor John Kimmich.   We use only the finest imported malts and  domestic hops available to bring you the tastiest and finest selection  of beers in Vermont!",
            "website": "http://www.alchemistbeer.com/",
            "established": "1976",
            "isOrganic": "N",
            "images": {
              "icon": "https://s3.amazonaws.com/brewerydbapi/brewery/pj4HJk/upload_rtxgwR-icon.png",
              "medium": "https://s3.amazonaws.com/brewerydbapi/brewery/pj4HJk/upload_rtxgwR-medium.png",
              "large": "https://s3.amazonaws.com/brewerydbapi/brewery/pj4HJk/upload_rtxgwR-large.png",
              "squareMedium": "https://s3.amazonaws.com/brewerydbapi/brewery/pj4HJk/upload_rtxgwR-squareMedium.png",
              "squareLarge": "https://s3.amazonaws.com/brewerydbapi/brewery/pj4HJk/upload_rtxgwR-squareLarge.png"
            },
            "status": "verified",
            "statusDisplay": "Verified",
            "createDate": "2012-01-03 02:42:09",
            "updateDate": "2015-12-22 15:00:03"
          }
        ],
        "status": "success"
      };

  describe('beerService', function() {
    beforeEach(module('BeerDbApp'));

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      APP_CONFIG = $injector.get('APP_CONFIG');
      beerService = $injector.get('beerService');
      $httpBackend.when("GET", APP_CONFIG.breweryDbBaseUrl + 'breweries').respond(mockBreweryPayload);
    }));

    it('should return mock brewery data', function() {
      //$httpBackend.flush();
      console.log('beerService.getBrewery() = ', beerService.getBrewery());
      beerService.getBrewery().success(function (data) {
        console.log('data = ', data);
        expect(data.name).toBe('Test Brewery');
      });
    })
  });

}());
