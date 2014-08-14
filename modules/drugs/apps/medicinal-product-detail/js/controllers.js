(function() {

    angular.module('appControllers')

        .controller('DrugsMedicinalProductController', ['$scope', 'AppService', function($scope, AppService) {

            this.update = function() {

                AppService.getData($scope, 'drugs', 'medicinal-product-detail', {'resource': $scope.resource})
                    .then(function(data) {
                        $scope.product = data["@graph"][0];
                        AppService.setTitle("Léčivý přípravek " + $scope.product.title);
                    });
            };

            AppService.init($scope, ['resource'], this.update);

        }]);

})();