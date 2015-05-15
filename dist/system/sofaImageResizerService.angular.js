/**
 * sofa-image-resizer-service - v0.3.0 - Fri May 15 2015 11:40:47 GMT+0200 (CEST)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
System.register(['imageResizerService'], function (_export) {
    var ImageResizerService;
    return {
        setters: [function (_imageResizerService) {
            ImageResizerService = _imageResizerService['default'];
        }],
        execute: function () {
            'use strict';

            'use strict';

            angular.module('sofa.imageResizeService', ['sofa.core']).factory('imageResizeService', ["configService", "$window", function (configService, $window) {
                var _ImageResizerService = ImageResizerService || sofa.ImageResizerService;
                return new ImageResizerService(configService, $window);
            }]);
        }
    };
});}(angular));
