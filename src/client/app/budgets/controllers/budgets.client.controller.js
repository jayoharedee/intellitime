(function () {
    'use strict';

    angular
        .module('app.budget')
        .controller('BudgetController', BudgetController);

    BudgetController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Budget',
        'TableSettings', 'Project', 'User',
        'BudgetForm'];
    /* @ngInject */
    function BudgetController(logger,
        $stateParams,
        $location,
        Budget,
        TableSettings, Project, User,
        BudgetForm) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Budget);
        vm.budget = {};

        vm.setFormFields = function(disabled) {
            vm.formFields = BudgetForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Budget object
            var budget = new Budget(vm.budget);

            console.log(vm.budget);
            // Redirect after save
            budget.$save(function(response) {
                console.log(response);
                logger.success('Budget created');
                $location.path('budgets/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Budget
        vm.remove = function(budget) {

            if (budget) {
                budget = Budget.get({budgetId:budget.id}, function() {
                    budget.$remove(function() {
                        logger.success('Budget deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.budget.$remove(function() {
                    logger.success('Budget deleted');
                    $location.path('/budgets');
                });
            }

        };

        // Update existing Budget
        vm.update = function() {
            var budget = vm.budget;

            budget.$update(function() {
                logger.success('Budget updated');
                $location.path('budgets/' + budget.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewBudget = function() {
            vm.budget = Budget.get({budgetId: $stateParams.budgetId});
            vm.setFormFields(true);
        };

        vm.toEditBudget = function() {
            vm.budget = Budget.get({budgetId: $stateParams.budgetId});
            vm.setFormFields(false);
        };

        // All the projects
        vm.projects = [];
        vm.users = [];
        vm.initBudget = function() {
            Project.query(function(project) {
                angular.forEach(project, function(p) {
                    vm.projects.push(p)
                })
            });
            User.query(function(user) {
                angular.forEach(user, function(p) {
                    vm.users.push(p)
                })
            });
        };

        vm.budgets = [];
        vm.getBudgets = function() {
            return Budget.query(function(budget) {
                angular.forEach(budget, function(p) {
                    vm.budgets.push(p)
                    console.log(p)
                })
            });
        };

        activate();

        function activate() {
            //logger.info('Activated Budget View');
        }
    }

})();
