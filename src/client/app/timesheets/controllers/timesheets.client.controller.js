(function () {
    'use strict';

    angular
        .module('app.timesheet')
        .controller('TimesheetController', TimesheetController)
        .directive('intelliCal', IntelliCal);

    TimesheetController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Timesheet',
        'TableSettings', 'Project', 'Activity', 'User',
        'TimesheetForm'];
    /* @ngInject */
    function TimesheetController(logger,
        $stateParams,
        $location,
        Timesheet,
        TableSettings, Project, Activity, User,
        TimesheetForm,
        alert) {

        var vm = this;


        vm.timesheets = [];
        vm.timesheet = {
        };
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
            console.log(vm.timesheets);
            vm.choices.push({'id': newItemNo});
        };

        vm.removeChoice = function() {
            var lastItem = vm.choices.length-1;
            vm.choices.splice(lastItem);
        };

        vm.submitTime = function() {

            console.log(vm.timesheets);

            var timesheet = {};
            var weekdays = [
                "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday", "Sunday"
            ];

            var request = [];

            vm.timesheets.forEach(function(e, i) {
                timesheet.activities = e.activity[i];
                timesheet.hours = e.hours[weekdays[i]][i];
                timesheet.projects = e.project[i];
                timesheet.day = weekdays[i];
                timesheet.appUsers = vm.timesheet.user1;
                timesheet.weekNumber = moment().isoWeek();
                // YUCK! do something about this...
                timesheet.date = moment().day(timesheet.day).week(parseInt(timesheet.weekNumber))._d;
                // make method to determind fiscalWeekNumber so it doesn't exceed 52
                timesheet.fiscalWeekNumber = (timesheet.weekNumber - 13);


                request.push(timesheet);

            });


            request.forEach(function() {
                Timesheet.save(timesheet, function() {
                    console.log('data has been saved', timesheet);
                })
            });
            //console.log(timesheet);




            // Timesheet.save(function(response) {
            //     logger.success('Budget created');
            //     $location.path('timesheets/' + response.id);
            // }, function(errorResponse) {
            //     vm.error = errorResponse.data.summary;
            // });
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

        console.log(vm.choices)
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
                    var date = moment().day(day).format("MMMM, D");
                    $scope.days.push({date: date, name: name});
                });

                console.log(moment().day("Monday").format("MMMM D"))
            },
            link: function(scope, element, attributes) {
                console.log(scope.days)
            }
        };
    }


})();
