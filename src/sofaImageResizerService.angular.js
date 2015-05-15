'use strict';
import ImageResizerService from 'imageResizerService';
angular.module('sofa.imageResizeService', ['sofa.core'])
.factory('imageResizeService', function(configService, $window) {
    var _ImageResizerService =  (typeof ImageResizerService === 'undefined') ? sofa.ImageResizerService : ImageResizerService;
    return new _ImageResizerService(configService, $window);
});
