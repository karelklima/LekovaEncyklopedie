(function() {

    angular.module('appControllers')

        .controller('DrugsMedicinalProductController', ['$scope', 'AppService', function($scope, AppService) {

            $scope.product;

            this.update = function() {

                AppService.getData($scope, 'drugs', 'medicinal-product-detail', {'resource': $scope.resource})
                    .then(function(data) {

                        $scope.product = data["@graph"][0];



                    });


            };

            AppService.init($scope, ['resource'], this.update);


        }]);

})();