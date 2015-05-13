'use strict';
import ImageResizerService from 'imageResizerService';
angular.module('sofa.imageResizeService', ['sofa.core'])
.factory('imageResizeService', function(configService, $window) {
    var _ImageResizerService = ImageResizerService || sofa.ImageResizerService;
    return new ImageResizerService(configService, $window);
});
