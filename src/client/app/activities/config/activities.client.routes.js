(function() {
    'use strict';

    angular
        .module('app.activity')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listActivity',
                config: {
                    url: '/activities',
                    templateUrl: 'app/activities/views/list.html',
                    controller: 'ActivityController',
                    controllerAs: 'vm',
                    title: 'List Activities',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Activities'
                    }
                }
            },
            {
                state: 'createActivity',
                config: {
                    url: '/activities/create',
                    templateUrl: 'app/activities/views/create.html',
                    controller: 'ActivityController',
                    controllerAs: 'vm',
                    title: 'Create Activity'
                }
            },
            {
                state: 'viewActivity',
                config: {
                    url: '/activities/:activityId',
                    templateUrl: 'app/activities/views/view.html',
                    controller: 'ActivityController',
                    controllerAs: 'vm',
                    title: 'View Activity'
                }
            },
            {
                state: 'editActivity',
                config: {
                    url: '/activities/:activityId/edit',
                    templateUrl: 'app/activities/views/edit.html',
                    controller: 'ActivityController',
                    controllerAs: 'vm',
                    title: 'Edit Activity'
                }
            }
        ];
    }
})();
