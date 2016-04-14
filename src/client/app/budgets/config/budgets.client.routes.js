(function() {
    'use strict';

    angular
        .module('app.budget')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listBudget',
                config: {
                    url: '/budgets',
                    templateUrl: 'app/budgets/views/list.html',
                    controller: 'BudgetController',
                    controllerAs: 'vm',
                    title: 'List Budgets',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Budgets'
                    }
                }
            },
            {
                state: 'createBudget',
                config: {
                    url: '/budgets/create',
                    templateUrl: 'app/budgets/views/create.html',
                    controller: 'BudgetController',
                    controllerAs: 'vm',
                    title: 'Create Budget'
                }
            },
            {
                state: 'viewBudget',
                config: {
                    url: '/budgets/:budgetId',
                    templateUrl: 'app/budgets/views/view.html',
                    controller: 'BudgetController',
                    controllerAs: 'vm',
                    title: 'View Budget'
                }
            },
            {
                state: 'editBudget',
                config: {
                    url: '/budgets/:budgetId/edit',
                    templateUrl: 'app/budgets/views/edit.html',
                    controller: 'BudgetController',
                    controllerAs: 'vm',
                    title: 'Edit Budget'
                }
            }
        ];
    }
})();
