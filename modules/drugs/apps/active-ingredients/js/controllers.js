(function() {

    angular.module('appControllers')

        .controller("DrugsActiveIngredientsController", ['$scope', 'AppService', function($scope, AppService) {

            $scope.limit = 10;

            $scope.toggleLimit = function() {
                $scope.limit = $scope.limit == 10 ? 1000 : 10;
            };

            this.update = function() {

                AppService.getData($scope, 'drugs', 'active-ingredients', {"resource": $scope.resource})
                    .then(function(data) {
                        $scope.ingredients = data["@graph"];
                    })

            };

            AppService.init($scope, ['resource'], this.update);



        }]);

})();