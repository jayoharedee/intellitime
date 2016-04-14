(function() {
    'use strict';

    angular
        .module('app.user')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listUser',
                config: {
                    url: '/users',
                    templateUrl: 'app/users/views/list.html',
                    controller: 'UserController',
                    controllerAs: 'vm',
                    title: 'List Users',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Users'
                    }
                }
            },
            {
                state: 'createUser',
                config: {
                    url: '/users/create',
                    templateUrl: 'app/users/views/create.html',
                    controller: 'UserController',
                    controllerAs: 'vm',
                    title: 'Create User'
                }
            },
            {
                state: 'viewUser',
                config: {
                    url: '/users/:userId',
                    templateUrl: 'app/users/views/view.html',
                    controller: 'UserController',
                    controllerAs: 'vm',
                    title: 'View User'
                }
            },
            {
                state: 'editUser',
                config: {
                    url: '/users/:userId/edit',
                    templateUrl: 'app/users/views/edit.html',
                    controller: 'UserController',
                    controllerAs: 'vm',
                    title: 'Edit User'
                }
            }
        ];
    }
})();
