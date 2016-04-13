(function() {
    'use strict';

    angular
        .module('app.project')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listProject',
                config: {
                    url: '/projects',
                    templateUrl: 'app/projects/views/list.html',
                    controller: 'ProjectController',
                    controllerAs: 'vm',
                    title: 'List Projects',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Projects'
                    }
                }
            },
            {
                state: 'createProject',
                config: {
                    url: '/projects/create',
                    templateUrl: 'app/projects/views/create.html',
                    controller: 'ProjectController',
                    controllerAs: 'vm',
                    title: 'Create Project'
                }
            },
            {
                state: 'viewProject',
                config: {
                    url: '/projects/:projectId',
                    templateUrl: 'app/projects/views/view.html',
                    controller: 'ProjectController',
                    controllerAs: 'vm',
                    title: 'View Project'
                }
            },
            {
                state: 'editProject',
                config: {
                    url: '/projects/:projectId/edit',
                    templateUrl: 'app/projects/views/edit.html',
                    controller: 'ProjectController',
                    controllerAs: 'vm',
                    title: 'Edit Project'
                }
            }
        ];
    }
})();
