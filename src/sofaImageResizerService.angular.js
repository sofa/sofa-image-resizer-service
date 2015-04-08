'use strict';
angular.module('sofa.imageResizeService', ['sofa.core'])
.factory('imageResizeService', function(configService, $window) {
    return new sofa.ImageResizerService(configService, $window);
});
