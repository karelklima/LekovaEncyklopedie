(function() {

    angular.module('appControllers')

        .controller('DrugsIngredientController', ['$scope', 'AppService', function($scope, AppService) {

            $scope.ingredient;

            this.update = function() {

                AppService.getData($scope, 'drugs', 'ingredient-detail', {'resource': $scope.resource})
                    .then(function(data) {

                        $scope.ingredient = data["@graph"][0];



                    });


            };

            AppService.init($scope, ['resource'], this.update);


        }]);

})();