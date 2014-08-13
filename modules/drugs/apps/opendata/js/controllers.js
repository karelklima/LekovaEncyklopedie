(function() {

    angular.module("appControllers")
        .controller("DrugsOpendataController", ['$scope', 'UrlService', 'AppService', function($scope, UrlService, AppService) {

            $scope.items = undefined;

            this.update = function() {

                var params = UrlService.getParams();

                var items = [];

                angular.forEach(params, function(value, key) {
                    if (angular.isString(value) && (value.indexOf("http://linked.opendata.cz") != -1 || value.indexOf(":") != -1))
                        items.push({
                            prefixedUrl: value,
                            fullUrl: AppService.expandPrefix(value)
                        });
                });

                $scope.items = items;

                //$scope.isHidden = items.length == 0;

            };

            AppService.init($scope, ['resource', 'version'], this.update);

        }]);

})();