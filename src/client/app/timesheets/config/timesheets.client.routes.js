(function() {
    'use strict';

    angular
        .module('app.timesheet')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listTimesheet',
                config: {
                    url: '/timesheets',
                    templateUrl: 'app/timesheets/views/list.html',
                    controller: 'TimesheetController',
                    controllerAs: 'vm',
                    title: 'List Timesheets',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Timesheets'
                    }
                }
            },
            {
                state: 'createTimesheet',
                config: {
                    url: '/timesheets/create',
                    templateUrl: 'app/timesheets/views/create.html',
                    controller: 'TimesheetController',
                    controllerAs: 'vm',
                    title: 'Create Timesheet'
                }
            },
            {
                state: 'viewTimesheet',
                config: {
                    url: '/timesheets/:timesheetId',
                    templateUrl: 'app/timesheets/views/view.html',
                    controller: 'TimesheetController',
                    controllerAs: 'vm',
                    title: 'View Timesheet'
                }
            },
            {
                state: 'editTimesheet',
                config: {
                    url: '/timesheets/:timesheetId/edit',
                    templateUrl: 'app/timesheets/views/edit.html',
                    controller: 'TimesheetController',
                    controllerAs: 'vm',
                    title: 'Edit Timesheet'
                }
            }
        ];
    }
})();
