'use strict';
/* global sofa */

describe('sofa.ImageResizerService', function () {

    var imageResizerService;

    beforeEach(function () {
        imageResizerService = new sofa.ImageResizerService();
    });

    it('should be defined', function () {
        expect(imageResizerService).toBeDefined();
    });
});
