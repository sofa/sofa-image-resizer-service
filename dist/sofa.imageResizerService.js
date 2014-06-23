/**
 * sofa-image-resizer-service - v0.2.0 - 2014-06-23
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO).
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (sofa, undefined) {

'use strict';
/* global sofa, base64Encode */

sofa.define('sofa.ImageResizerService', function (configService, $window) {

    // http://phpjs.org/functions/base64_encode/
    /* jshint ignore:start */
    var base64Encode = function (data) {
        if (typeof $window.btoa === 'function') {
            return $window.btoa(data);
        }
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = '',
            tmpArr = [];
        if (!data) {
            return data;
        }
        do { // pack three octets into four hexets
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            // use hexets to index into b64, and append result to encoded string
            tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);
        enc = tmpArr.join('');
        var r = data.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    };
    /* jshint ignore:end */

    //http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
    function objectToQueryString(obj) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
        return str.join('&');
    }

    // http://www.developerdrive.com/2013/08/turning-the-querystring-into-a-json-object-using-javascript/
    function queryStringToObject(queryString) {
        var pairs = queryString.split('&');
        var result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return JSON.parse(JSON.stringify(result));
    }

    var resizeUrlCache = {},
        self = {};

    self.resize = function (imageUrl, args) {
        if (!configService.get('imageResizerEnabled')) {
            return (imageUrl);
        }

        var cacheKey;
        if (sofa.Util.isString(args)) {
            cacheKey = imageUrl + args;
        } else {
            cacheKey = imageUrl + objectToQueryString(args);
        }
        if (resizeUrlCache[cacheKey]) {
            return resizeUrlCache[cacheKey];
        }

        // no cache hit, decode string argument to object if required
        if (sofa.Util.isString(args)) {
            args = queryStringToObject(args);
        }
        if (!args || !args.hasOwnProperty('maxwidth') || !args.hasOwnProperty('maxheight')) {
            throw new Error('maxwidth and maxheight are required parameters');
        }

        // Add protocol if not specified in URL
        if (/^\/\//.test(imageUrl)) {
            imageUrl = $window.location.protocol + imageUrl;
        }

        var defaults = {
            cmd: 'resize',
            url: imageUrl,
            quality: 100,
            devicePixelRatio: $window.devicePixelRatio
        },
            fullArgs = sofa.Util.extend(args, defaults),
            imageExt = imageUrl.substring(imageUrl.lastIndexOf('.') + 1);

        // In case of retina display, need to fetch larger image
        if (args.devicePixelRatio > 1) {
            fullArgs.maxwidth *= args.devicePixelRatio;
            fullArgs.maxheight *= args.devicePixelRatio;
        }

        var encodedCall = base64Encode(objectToQueryString(fullArgs)).replace('/', '_') + '.' + imageExt,
            resizedImageUrl = configService.get('imageResizerEndpoint') + encodedCall;

        resizeUrlCache[cacheKey] = resizedImageUrl;

        return resizedImageUrl;
    };

    return self;
});

}(sofa));
