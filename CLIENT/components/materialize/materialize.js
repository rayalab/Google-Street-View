angular.module('materialize', [])

.directive('materializeLink', function materializeLink() {
    return {
        templateUrl: 'components/materialize/link.html',
        restrict: 'E',
        scope: {
            href: '@',
            icon: '@',
            label: '@'
        },
        link: function(scope) {
            scope.inputId = 'id' + Math.floor(Math.random() * 1000000000);
            if (typeof scope.href === "undefined") {
                scope.href = "javascript:void(0);";
            }
        }
    };
})

.directive('materializeInputText', function materializeInputText() {
    return {
        templateUrl: 'components/materialize/input-text.html',
        restrict: 'E',
        scope: {
            values: '=ngModel',
            label: '@label',
            placeholder: '@'
        },
        link: function(scope) {
            scope.inputId = 'id' + Math.floor(Math.random() * 1000000000);
        }
    };
})

.directive('materializeSelect', function materializeSelect($timeout) {
    return {
        templateUrl: 'components/materialize/select.html',
        restrict: 'E',
        scope: {
            options: '=options',
            selected: '=ngModel',
            label: '@label'
        },
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {
            scope.inputId = 'id' + Math.floor(Math.random() * 1000000000);
            ngModel.$render = function() {
                scope.$watch('options', function(newValue) {
                    if (newValue) {
                        if (Array.isArray(newValue)) {
                            newValue = angular.extend({}, newValue);
                            scope.options = newValue;
                        }
                        $timeout(function() {
                            $('select').material_select('destroy');
                            $('select').material_select();
                        }, 0);
                    }
                });
            };
        }
    };
})

.directive('materializeInputDatetime', function materializeInputDatetime() {
    return {
        templateUrl: 'components/materialize/input-datetime.html',
        restrict: 'E',
        scope: {
            values: '=ngModel',
            label: '@label'
        },
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {
            scope.inputId = 'id' + Math.floor(Math.random() * 1000000000);
            scope.labelDate = "Fecha " + scope.label;
            scope.labelTime = "Hora " + scope.label;
            scope.dateParser = '2016-01-01';
            scope.timeParser = '12:00';

            ngModel.$render = function() {
                if (typeof scope.values !== 'undefined') {
                    if (scope.values !== 'NaN-NaN-NaN NaN:NaN') {
                        if (scope.values !== 'undefined undefined') {
                            var tmp = scope.values;
                            var d = new Date(tmp);

                            var month = parseInt(d.getMonth()) + 1;
                            if (month < 10) {
                                month = '0' + month;
                            }

                            var day = d.getDate();
                            if (day < 10) {
                                day = '0' + day;
                            }

                            var hour = d.getHours();
                            if (hour < 10) {
                                hour = '0' + hour;
                            }

                            var minutes = d.getMinutes();
                            if (minutes < 10) {
                                minutes = '0' + minutes;
                            }

                            var dateGetter = d.getFullYear() + "-" + month + "-" + day;
                            var timeGetter = hour + ":" + minutes;
                            scope.dateParser = dateGetter;
                            scope.timeParser = timeGetter;
                        }
                    }
                }
            };

            scope.$watch('dateParser', function(newValue) {
                scope.values = newValue + ' ' + scope.timeParser + '';
            });

            scope.$watch('timeParser', function(newValue) {
                scope.values = scope.dateParser + ' ' + newValue + '';
            });

            $.extend($.fn.pickadate.defaults, {
                monthsFull: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                monthsShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                weekdaysFull: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
                weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
                today: 'hoy',
                clear: 'borrar',
                close: 'cerrar',
                firstDay: 1,
                format: 'yyyy-mm-dd'
            });

            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15, // Creates a dropdown of 15 years to control year
            });

            $('.timepicker').pickatime({
                min: [7, 0],
                max: [23, 0],
                interval: 10,
                format: "HH:i"
            });
        }
    };
})

; // EOF