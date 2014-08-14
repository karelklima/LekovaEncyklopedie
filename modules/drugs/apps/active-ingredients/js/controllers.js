(function() {

    angular.module('appControllers')

        .controller("DrugsActiveIngredientsController", ['$scope', 'AppService', function($scope, AppService) {

            $scope.ingredients;

            this.update = function() {

                AppService.getData($scope, 'drugs', 'active-ingredients', {"resource": $scope.resource})
                    .then(function(data) {
                        $scope.ingredients = data["@graph"];
                    })

            };

            AppService.init($scope, ['resource'], this.update);



        }]);

})();