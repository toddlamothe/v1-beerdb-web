(function () {
  'use strict';

  var beerService = null,
    $httpBackend = null,
    $rootScope,
    APP_CONFIG = null,
    mockBreweryPayload_old = {
        "currentPage": 1,
        "numberOfPages": 1,
        "totalResults": 1,
        "data": [
          {
            "id": "pj4HJk",
            "name": "Test Brewery",
            "nameShortDisplay": "The Alchemist",
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
      },
      mockBreweryPayload = {
          "currentPage": 1,
          "numberOfPages": 1,
          "totalResults": 3,
          "data": [
            {
              "id": "7Tjp4C",
              "name": "Test Brewery",
              "nameShortDisplay": "Orlio Organic",
              "description": null,
              "website": "http://www.orlio.net/",
              "established": null,
              "isOrganic": "N",
              "images": null,
              "status": "verified",
              "statusDisplay": "Verified",
              "createDate": "2012-01-03 02:42:04",
              "updateDate": "2015-12-22 14:53:57",
              "locations": [
                {
                  "name": "Main Brewery",
                  "streetAddress": "5 Bartlett Bay Road",
                  "phone": null,
                  "locationTypeDisplay": "Micro Brewery",
                  "locationType": "micro",
                  "latitude": 44.4284058,
                  "longitude": -73.21316,
                  "locality": "South Burlington",
                  "region": "Vermont",
                  "postalCode": "05403",
                  "isPrimary": "Y",
                  "country": null
                }
              ]
            }
          ],
          "status": null
      };



  describe('beerService', function() {
    beforeEach(module('BeerDbApp'));

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      APP_CONFIG = $injector.get('APP_CONFIG');
      beerService = $injector.get('beerService');
      $rootScope = $injector.get('$rootScope');
    }));

    it('should return mock brewery data', function() {
      var searchParams = {
        city  : null,
        state : 'Vermont',
        zip   : null
      };

      var url = APP_CONFIG.get("breweryDbBaseUrl") + 'breweries/locations?isClosed=n&state=Vermont';

      $httpBackend.whenGET(url)
        .respond(mockBreweryPayload);

      beerService.getBreweries(searchParams)
        .success(function(data) {
          console.log('return data from mock service call: ', data);
          expect(data.data[0].name).toBe('Test Brewery');
        });

        $httpBackend.flush();
    });
    
  });

}());
