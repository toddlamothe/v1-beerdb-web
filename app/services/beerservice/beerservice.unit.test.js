(function () {
  'use strict';

  var beerService = null,
    $httpBackend = null,
    $rootScope,
    APP_CONFIG = null,
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
      },
      locations = [
        {
          lat: 44.4284058,
          lng: -73.21316,
          message: "test message"
        }
      ];



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
          expect(data.data[0].name).toBe('Test Brewery');
        });

        $httpBackend.flush();
    });

    it('should invoke callback on map refresh', function() {
      beerService.onMapRefresh(function(locations) {
        console.log(locations);
        expect(locations[0].message).toBe("test message");
      });

      beerService.refreshMap(locations);
    });

  });

}());
