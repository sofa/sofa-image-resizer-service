/**
 * sofa-image-resizer-service - v0.3.0 - Fri May 15 2015 14:05:58 GMT+0200 (CEST)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _imageResizerService = require('imageResizerService');

var _imageResizerService2 = _interopRequireDefault(_imageResizerService);

'use strict';

angular.module('sofa.imageResizeService', ['sofa.core']).factory('imageResizeService', ["configService", "$window", function (configService, $window) {
    var _ImageResizerService = typeof _imageResizerService2['default'] === 'undefined' ? sofa.ImageResizerService : _imageResizerService2['default'];
    return new _ImageResizerService(configService, $window);
}]);}(angular));
