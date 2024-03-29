(function(angular) {

    angular.module('appDirectives', ['appServices'])

        .directive('click', ['UrlService', 'UtilService', '$parse', function (UrlService, UtilService, $parse) {
            return {
                restrict: 'A',
                scope: {
                    params: '='
                },
                link: function (scope, element, attributes) {

                    var attrRegex = new RegExp("^(click|params|ng-.*|sys-.*|class|id)$");

                    var getEffectiveParams = function() {
                        var params = angular.isDefined(scope.params) ? angular.copy(scope.params) : {};

                        // Copy all relevant attributes to scope.params
                        angular.forEach(attributes.$attr, function(attribute, key) {
                            if (!attrRegex.test(attribute)) {
                                params[key] = attributes[key];
                            }
                        });

                        if (
                            (angular.isDefined(params.module) && angular.isDefined(params.application))
                            ||
                            (angular.isDefined(params.resource) && angular.isDefined(params.type))
                            ) {
                            return params; // Overwrites current params
                        } else {
                            var extendedParams = UrlService.getAllParams();
                            angular.extend(extendedParams, params);
                            return extendedParams; // Extends current params
                        }
                    };

                    // Set initial href attribute
                    element.attr("href", UtilService.getUrl(getEffectiveParams()));

                    element.bind('mouseover', function() {
                        element.attr("href", UtilService.getUrl(getEffectiveParams()));
                    });

                    element.bind('click', function(event) {
                        if (event.button == 0 && !(event.metaKey || event.ctrlKey)) { // just metaKey does not work properly
                            event.preventDefault(); //open in main window
                            UrlService.setUrl(getEffectiveParams());
                        }
                        return true;
                    });
                }
            }
        }])

    /*.directive('click', ['UrlService', 'UtilService', '$parse', function (UrlService, UtilService, $parse) {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: {
                module: '@',
                application: '@',
                resource: '@',
                type: '@',
                query: '@',
                params: '@'
            },
            template: "<a ng-click=click($event) ng-transclude></a>",
            link: function (scope, element, attributes) {
                var params = angular.isDefined(scope.params) ? angular.fromJson(scope.params) : {};
                if (angular.isDefined(scope.resource)) {
                    params['resource'] = scope.resource;
                }
                if (angular.isDefined(scope.type)) {
                    params['type'] = scope.type;
                }
                if (angular.isDefined(scope.query)) {
                    params['query'] = scope.query;
                }

                if(!(angular.isDefined(scope.module) && angular.isDefined(scope.application)) && !(angular.isDefined(scope.resource) && angular.isDefined(scope.type))){
                    //Need to append params
                    var currentParams = UrlService.getAllParams();
                    for (var paramName in currentParams) {
                        if(currentParams.hasOwnProperty(paramName)){
                            params[paramName] = currentParams[paramName];
                        }
                    }

                    if(angular.isDefined(params['module'])){
                        scope.module = params['module'];
                        attributes.$set('module', scope.module);
                        delete params['module'];
                    }

                    if(angular.isDefined(params['application'])){
                        scope.application = params['application'];
                        attributes.$set('application', scope.application);
                        delete params['application'];
                    }

//                    console.log(params);
                }
                if( angular.isDefined(scope.module) && angular.isDefined(scope.application) ){
                    attributes.$set('href', '#/' + scope.module + '/' + scope.application + '?' + UtilService.getUrlSearch(params));
                } else {
                    attributes.$set('href', '#/?' + UtilService.getUrlSearch(params));
                }

                scope.click = function ($event) {
//                console.log($event);
//                console.log("Phase[1]: "+($event.button == 0 && !$event.metaKey));
                    if ($event) {
                        if ($event.button == 0 && !$event.metaKey) {
                            $event.preventDefault(); //open in main window
                        }
                    }
//                console.log("Phase[2]: "+!$event.isDefaultPrevented());

                    if ($event && !$event.isDefaultPrevented()) { //if we don't need to open link in main window, we break this function
                        return false;
                    }

                    params.module = scope.module;
                    params.application = scope.application;

                    UrlService.setUrl(params);

                    if (attributes.sysClick) {//call processing function from scope
                        var fn = $parse(attributes.sysClick);
                        fn(scope.$parent, {$event: $event});
                    }
                    return true;
                }
            }
        };
    }])*/

    .directive('compile', ['$compile', function ($compile) {
        return function (scope, element, attrs) {
            scope.$watch(
                function (scope) {
                    // watch the 'compile' expression for changes
                    return scope.$eval(attrs.compile);
                },
                function (value) {
                    // when the 'compile' expression changes
                    // assign it into the current DOM
                    element.html(value);

                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                }
            );
        };
    }])

    .directive('scrollIf', function () {
        return function (scope, element, attributes) {
            setTimeout(function () {
                if (scope.$eval(attributes.scrollIf)) {
                    window.scrollTo(0, element[0].offsetTop - 100)
                }
            });
        }
    })


    .directive('changeTimeout', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                if (!attr.ngChange) {
                    throw new TypeError('ng-change directive not present');
                }

                angular.forEach(ctrl.$viewChangeListeners, function (listener, index) {
                    ctrl.$viewChangeListeners[index] = _.debounce(function () {
                        scope.$apply(attr.ngChange);
                    }, attr.changeTimeout || 0)
                });
            }
        }
    });

})(angular);
