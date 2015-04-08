/**
 * sofa-image-resizer-service - v0.3.0 - Wed Apr 08 2015 10:08:03 GMT+0200 (CEST)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
'use strict';
angular.module('sofa.imageResizeService', ['sofa.core'])
.factory('imageResizeService', ["configService", "$window", function(configService, $window) {
    return new sofa.ImageResizerService(configService, $window);
}]);
}(angular));
