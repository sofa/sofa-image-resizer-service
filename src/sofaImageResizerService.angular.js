'use strict';
import ImageResizerService from 'imageResizerService';
angular.module('sofa.imageResizeService', ['sofa.core'])
.factory('imageResizeService', function(configService, $window) {
    return new ImageResizerService(configService, $window);
});
