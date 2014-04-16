'use strict';
/* global sofa */

describe('sofa.ImageResizerService', function () {

    var imageResizerService,
        configService;

    beforeEach(function () {
        configService = new sofa.ConfigService();
        imageResizerService = new sofa.ImageResizerService(configService);
    });

    it('should be defined', function () {
        expect(imageResizerService).toBeDefined();
    });

    it('should have a method resize', function () {
        expect(imageResizerService.resize).toBeDefined();
    });

    describe('sofa.ImageResizerService#resize', function () {

        it('should be a function', function () {
            expect(typeof imageResizerService.resize).toBe('function');
        });

        it('should require maxwidth/maxheight', function () {
            expect(function () {
                imageResizerService.resize();
            }).toThrow('maxwidth and maxheight are required parameters');
        });

        it('should return a url to the CDN', function () {
            var resizedUrl = imageResizerService.resize('https://www.couchcommerce.com/images/couch_brand.png', { maxwidth: 100, maxheight: 100});
            expect(resizedUrl).toBe('string');
            expect(resizedUrl.contains(configService.indexOf('imageResizerEndpoint')) > -1).toBe(true);
        });

    });
});
