/**
 * sofa-image-resizer-service - v0.3.0 - Fri May 15 2015 14:05:56 GMT+0200 (CEST)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (sofa, document, undefined) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/* global sofa */
/* @flow */

var ImageResizerService = (function () {
    function ImageResizerService(configService, $window) {
        _classCallCheck(this, ImageResizerService);

        this.configService = configService;
        this.$window = $window;

        this.resizeUrlCache = {};
    }

    _createClass(ImageResizerService, [{
        key: 'base64Encode',

        // http://phpjs.org/functions/base64_encode/
        /* jshint ignore:start */
        value: function base64Encode(data) {
            if (typeof this.$window.btoa === 'function') {
                return this.$window.btoa(data);
            }
            var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var o1,
                o2,
                o3,
                h1,
                h2,
                h3,
                h4,
                bits,
                i = 0,
                ac = 0,
                enc = '',
                tmpArr = [];
            if (!data) {
                return data;
            }
            do {
                // pack three octets into four hexets
                o1 = data.charCodeAt(i++);
                o2 = data.charCodeAt(i++);
                o3 = data.charCodeAt(i++);
                bits = o1 << 16 | o2 << 8 | o3;
                h1 = bits >> 18 & 63;
                h2 = bits >> 12 & 63;
                h3 = bits >> 6 & 63;
                h4 = bits & 63;
                // use hexets to index into b64, and append result to encoded string
                tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
            } while (i < data.length);
            enc = tmpArr.join('');
            var r = data.length % 3;
            return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
        }
    }, {
        key: 'objectToQueryString',

        /* jshint ignore:end */

        //http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
        value: function objectToQueryString(obj) {
            var str = [];
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str.push(p + '=' + obj[p]);
                }
            }
            return str.join('&');
        }
    }, {
        key: 'queryStringToObject',

        // http://www.developerdrive.com/2013/08/turning-the-querystring-into-a-json-object-using-javascript/
        value: function queryStringToObject(queryString) {
            var pairs = queryString.split('&');
            var result = {};
            pairs.forEach(function (pair) {
                pair = pair.split('=');
                result[pair[0]] = decodeURIComponent(pair[1] || '');
            });
            return JSON.parse(JSON.stringify(result));
        }
    }, {
        key: 'resize',
        value: function resize(imageUrl, args) {
            if (!this.configService.get('imageResizerEnabled')) {
                return imageUrl;
            }

            var cacheKey;
            if (sofa.Util.isString(args)) {
                cacheKey = imageUrl + args;
            } else {
                cacheKey = imageUrl + this.objectToQueryString(args);
            }
            if (this.resizeUrlCache[cacheKey]) {
                return this.resizeUrlCache[cacheKey];
            }

            // no cache hit, decode string argument to object if required
            if (sofa.Util.isString(args)) {
                args = this.queryStringToObject(args);
            }
            if (!args || !args.hasOwnProperty('maxwidth') || !args.hasOwnProperty('maxheight')) {
                throw new Error('maxwidth and maxheight are required parameters');
            }

            // Add protocol if not specified in URL
            if (/^\/\//.test(imageUrl)) {
                imageUrl = this.$window.location.protocol + imageUrl;
            }

            var defaults = {
                cmd: 'resize',
                url: encodeURI(imageUrl),
                quality: 100,
                devicePixelRatio: this.$window.devicePixelRatio
            },
                fullArgs = sofa.Util.extend(args, defaults),
                imageExt = imageUrl.substring(imageUrl.lastIndexOf('.') + 1);

            // In case of retina display, need to fetch larger image
            if (args.devicePixelRatio > 1) {
                fullArgs.maxwidth *= args.devicePixelRatio;
                fullArgs.maxheight *= args.devicePixelRatio;
            }

            var encodedCall = this.base64Encode(this.objectToQueryString(fullArgs)).replace('/', '_').match(/.{1,250}/g).join('/') + '.' + imageExt,
                resizedImageUrl = this.configService.get('imageResizer') + encodedCall;

            this.resizeUrlCache[cacheKey] = resizedImageUrl;

            return resizedImageUrl;
        }
    }]);

    return ImageResizerService;
})();

if (sofa) {
    sofa.define('sofa.ImageResizerService', function (configService, $window) {
        return new ImageResizerService(configService, $window);
    });
}}(sofa, document));
