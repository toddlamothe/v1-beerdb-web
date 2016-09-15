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
      },
      mockBeerPayload = {
          "currentPage": 1,
          "numberOfPages": 1,
          "totalResults": 1,
          "data": [
            {
              "id": "CFIZtr",
              "name": "Test Beer",
              "nameDisplay": "Heady Topper",
              "description": "We love hops – that’s why our flagship Double IPA, Heady Topper, is packed full of them. Heady Topper was designed to showcase the complex flavors and aromas these flowers produce. The Alchemist has been brewing Heady Topper since 2003. This Double IPA is not intended to be the strongest or most bitter DIPA. It is brewed to give you wave after wave of hop flavor without any astringent bitterness. We brew Heady Topper with a proprietary blend of six hops – each imparting its own unique flavor and aroma. Take a big sip of Heady and see what hop flavors you can pick out. Orange? Tropical Fruit? Pink Grapefruit? Pine? Spice? There is just enough malt to give this beer some backbone, but not enough to take the hops away from the center stage.",
              "abv": "8",
              "ibu": "120",
              "glasswareId": 6,
              "srmId": 13,
              "styleId": 31,
              "isOrganic": "N",
              "labels": {
                "icon": "https://s3.amazonaws.com/brewerydbapi/beer/CFIZtr/upload_Y3Prr0-icon.png",
                "medium": "https://s3.amazonaws.com/brewerydbapi/beer/CFIZtr/upload_Y3Prr0-medium.png",
                "large": "https://s3.amazonaws.com/brewerydbapi/beer/CFIZtr/upload_Y3Prr0-large.png"
              },
              "status": "verified",
              "statusDisplay": "Verified",
              "createDate": "2012-01-03 02:43:21",
              "updateDate": "2015-12-16 03:35:34",
              "glass": {
                "id": 6,
                "name": "Snifter",
                "createDate": "2012-01-03 02:41:33"
              },
              "srm": {
                "id": 13,
                "name": "13",
                "hex": "CB6200"
              },
              "style": {
                "id": 31,
                "categoryId": 3,
                "category": {
                  "id": 3,
                  "name": "North American Origin Ales",
                  "createDate": "2012-03-21 20:06:45"
                },
                "name": "Imperial or Double India Pale Ale",
                "shortName": "Imperial IPA",
                "description": "Imperial or Double India Pale Ales have intense hop bitterness, flavor and aroma. Alcohol content is medium-high to high and notably evident. They range from deep golden to medium copper in color. The style may use any variety of hops. Though the hop character is intense it's balanced with complex alcohol flavors, moderate to high fruity esters and medium to high malt character. Hop character should be fresh and lively and should not be harsh in quality. The use of large amounts of hops may cause a degree of appropriate hop haze. Imperial or Double India Pale Ales have medium-high to full body. Diacetyl should not be perceived. The intention of this style of beer is to exhibit the fresh and bright character of hops. Oxidative character and aged character should not be present.",
                "ibuMin": "65",
                "ibuMax": "100",
                "abvMin": "7.5",
                "abvMax": "10.5",
                "srmMin": "5",
                "srmMax": "13",
                "ogMin": "1.075",
                "fgMin": "1.012",
                "fgMax": "1.02",
                "createDate": "2012-03-21 20:06:45",
                "updateDate": "2015-04-07 15:26:46"
              }
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
      var url = APP_CONFIG.breweryDbBaseUrl + 'breweries';
      console.log('  will mock payload returned from url = ', APP_CONFIG.breweryDbBaseUrl + 'breweries');
      // $httpBackend.when("GET", APP_CONFIG.breweryDbBaseUrl + 'breweries').respond(mockBreweryPayload);
      //$httpBackend.when("GET", url).respond(mockBreweryPayload);
    }));

    it('should return mock brewery data', function() {
      //$httpBackend.flush();
      console.log('  beerService.getBrewery() = ', beerService.getBrewery());
      beerService.getBrewery().success(function (data) {
        console.log('  getBrewery');
        console.log('  data = ', data);
        expect(data.name).toBe('Test Brewery');
      });
    });

    it('should return mock beer data', function() {
      //console.log('beerService.getBeers() = ', beerService.getBeers());
      beerService.getBeers().success(function(data) {
        console.log('  getBeers');
        console.log('  data = ', data);
        expect(data.name).toBe('Test Beer2');
      })
    });

  });

}());
