/**
 * sofa-image-resizer-service - v0.3.0 - Fri May 15 2015 11:40:47 GMT+0200 (CEST)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
define(['exports', 'imageResizerService'], function (exports, _imageResizerService) {
    'use strict';

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    var _ImageResizerService = _interopRequire(_imageResizerService);

    'use strict';

    angular.module('sofa.imageResizeService', ['sofa.core']).factory('imageResizeService', ["configService", "$window", function (configService, $window) {
        var _ImageResizerService = _ImageResizerService || sofa.ImageResizerService;
        return new _ImageResizerService(configService, $window);
    }]);
});}(angular));
