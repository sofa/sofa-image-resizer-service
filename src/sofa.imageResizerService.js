'use strict';
/* global sofa */

sofa.define('sofa.ImageResizerService', function (configService) {
    var RESIZER_ENDPOINT = configService.get('imageResizerEndpoint');
    var RESIZER_ENABLED = configService.get('imageResizerEnabled');

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
        if (!RESIZER_ENABLED) {
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
            imageUrl = window.location.protocol + imageUrl;
        }

        var defaults = {
            cmd: 'resize',
            url: imageUrl,
            quality: 100,
            devicePixelRatio: window.devicePixelRatio
        },
            fullArgs = sofa.Util.extend(args, defaults),
            imageExt = imageUrl.substring(imageUrl.lastIndexOf('.') + 1);

        // In case of retina display, need to fetch larger image
        if (args.devicePixelRatio > 1) {
            fullArgs.maxwidth *= args.devicePixelRatio;
            fullArgs.maxheight *= args.devicePixelRatio;
        }

        var encodedCall = window.btoa(objectToQueryString(fullArgs)).replace('/', '_') + '.' + imageExt,
            resizedImageUrl = RESIZER_ENDPOINT + encodedCall;

        resizeUrlCache[cacheKey] = resizedImageUrl;

        return resizedImageUrl;
    };

    return self;
});
