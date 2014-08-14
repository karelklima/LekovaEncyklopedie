(function() {

    angular.module('appControllers')

        .controller('DrugsIngredientController', ['$scope', 'AppService', function($scope, AppService) {

            $scope.ingredient = undefined;


            this.update = function() {

                AppService.getData($scope, 'drugs', 'ingredient-detail', {'resource': $scope.resource})
                    .then(function(data) {
                        $scope.ingredient = data["@graph"][0];
                        AppService.setTitle("Účinná látka " + $scope.ingredient["prefLabel"]);
                    });
            };

            AppService.init($scope, ['resource'], this.update);

        }]);

})();