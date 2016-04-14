(function () {
    'use strict';

    angular
        .module('app.timesheet')
        .controller('TimesheetController', TimesheetController);

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
        //These variables MUST be set as a minimum for the calendar to work
        vm.calendarView = 'week';
        vm.viewDate = new Date();
        // vm.events = [
        //     {
        //         title: 'An event',
        //         type: 'warning',
        //         startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        //         endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        //         editable: true,
        //         draggable: true,
        //         resizable: true
        //     }, {
        //         title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        //         type: 'info',
        //         startsAt: moment().subtract(1, 'day').toDate(),
        //         endsAt: moment().add(5, 'days').toDate(),
        //         draggable: true,
        //         resizable: true
        //     }, {
        //         title: 'This is a really long event title that occurs on every year',
        //         type: 'important',
        //         startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        //         endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        //         recursOn: 'year',
        //         draggable: true,
        //         resizable: true
        //     }
        // ];

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
            vm.choices.push({'id':'choice'+newItemNo});
        };

        vm.removeChoice = function() {
            var lastItem = vm.choices.length-1;
            vm.choices.splice(lastItem);
        };
        
        vm.submitTime = function() {
            Timesheet.save(function(response) {
                logger.success('Budget created');
                $location.path('timesheets/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
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

})();
