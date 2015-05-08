/**
 * sofa-image-resizer-service - v0.3.0 - Fri May 08 2015 14:19:08 GMT+0200 (CEST)
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
    return new _imageResizerService2['default'](configService, $window);
}]);}(angular));
