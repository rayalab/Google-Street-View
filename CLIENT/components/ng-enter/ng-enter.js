//A directive to pass a function in on an enter key to do what we want.
//Credits: http://eric.sau.pe/angularjs-detect-enter-key-ngenter/
angular.module('ngEnter').directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});