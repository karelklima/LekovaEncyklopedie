(function() {

    angular.module('appControllers')

        .controller('DrugsMedicinalProductsController', ['$scope', 'AppService', function($scope, AppService) {


            this.update = function() {
                AppService.getData($scope, 'drugs', 'medicinal-products', {resource:$scope.resource})
                    .then(function(data) {
                        $scope.products = data["@graph"];
                    });
            }

            AppService.init($scope, ['resource'], this.update);

        }]);


})();