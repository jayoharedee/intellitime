(function () {
    'use strict';

    angular
        .module('app.timesheet')
        .controller('TimesheetController', TimesheetController)
        .directive('intelliCal', IntelliCal);

    TimesheetController.$inject = [
        'logger',
        'Timesheet',
         'Project', 'Activity', 'User', '$scope'
    ];
    /* @ngInject */
    function TimesheetController(logger,
        Timesheet,
        Project, Activity, User, $scope,
        alert) {

        var vm = this;

        vm.timesheets = [];
        vm.timesheet = {};
        //These variables MUST be set as a minimum for the calendar to work
        vm.calendarView = 'week';
        vm.viewDate = new Date();

        vm.isCellOpen = true;

        vm.eventClicked = function(event) {
            logger.info('Clicked', event);
        };

        vm.eventEdited = function(event) {
            alert.show('Edited', event);
        };

        vm.eventDeleted = function(event) {
            alert.show('Deleted', event);
        };

        vm.eventTimesChanged = function(event) {
            alert.show('Dropped or resized', event);
        };

        vm.toggle = function($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();
            event[field] = !event[field];
        };

        vm.events = [];
        vm.getTimeSheets = function() {
            Timesheet.query(function(sheet) {
                angular.forEach(sheet, function(p) {
                    vm.events.push(p)
                })
            });
        };

        vm.choices = [{id: 'choice1'}];
        vm.addNewChoice = function() {
            var newItemNo = vm.choices.length+1;
            vm.timesheets.push(vm.timesheet);
            vm.choices.push({'id': newItemNo});
        };

        vm.removeChoice = function() {
            var lastItem = vm.choices.length-1;
            vm.choices.splice(lastItem);
        };

        vm.submitTime = function() {

            var j = 0, request = [];
            for(var day in vm.timesheet.hours) {

                for(var date in vm.timesheet.hours[day]) {
                    var hours = vm.timesheet.hours[day][date];

                    for(var hour in hours) {
                        var timesheet = {};
                        timesheet.date = Object.keys(vm.timesheet.hours[day])[0];
                        // fetches day of week through filter, must find better solution
                        var dayOfWeek = $scope.days.filter(function(day) {
                            return day.date === timesheet.date
                        })[0].name;
                        timesheet.day = dayOfWeek;
                        timesheet.activity = vm.timesheet.activity[j];
                        timesheet.project = vm.timesheet.project[j++];
                        timesheet.hours = hours[hour];
                        timesheet.appUser = vm.timesheet.user1;
                        timesheet.weekNumber = moment().isoWeek();
                        timesheet.fiscalWeekNumber = (timesheet.weekNumber - 13);
                        request.push(timesheet);
                    }
                }
            }

            request.forEach(function(item) {
                Timesheet.save(item, function() {
                    logger.success(item.day +', ' + item.date, 'has been saved.');
                }, function(response) {
                    logger.error(response.data.message);
                })
            });
        };

        // obiously ADJUST these below because we don't want themr unning every time
        // populates the projects drop down
        vm.projects = [];
        (function() {
            Project.query(function(project) {
                angular.forEach(project, function(p) {
                    vm.projects.push(p);
                })
            })
        }());


        //console.log(vm.dayLabel);


        // populates the activities drop down
        vm.activities = [];
        (function() {
            Activity.query(function(activity) {
                angular.forEach(activity, function(p) {
                    vm.activities.push(p);
                });
            });
        }());

        // temporary fix for users
        vm.users = [];
        (function() {
            User.query(function(user) {
                angular.forEach(user, function(p) {
                    vm.users.push(p)
                })
            });
        }());

    }

    function IntelliCal() {
        return {
            restrict: 'E',
            templateUrl: 'app/timesheets/directives/intelli-cal.html',
            controller: function(moment, $scope) {
                var weekdays = [
                    "Monday", "Tuesday", "Wednesday", "Thursday",
                    "Friday", "Saturday", "Sunday"
                ];

                $scope.days = [];
                weekdays.forEach(function(day, number) {
                    var name = day;
                    var date = moment().startOf('isoweek').day(day).format("MMMM, D");


                    if (day === "Sunday"){
                        date = date.split(' ');
                        date = date[0] + ' ' + (parseInt(date[1]) + 7);
                    }

                    $scope.days.push({date: date, name: name});
                });
            },
            link: function(scope, element, attributes) {
            }
        };
    }

})();
