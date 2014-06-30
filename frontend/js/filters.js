var appFilters;

appFilters = angular.module('appFilters', []);
appFilters.filter('decodeUnicode', function() {
        var decodeUnicodeStringRegex = /\\u([\d\w]{4})/gi;
        return function (encodedString) {
            return encodedString.replace(decodeUnicodeStringRegex, function (match, grp) {
                return String.fromCharCode(parseInt(grp, 16));
            });
        }
    });