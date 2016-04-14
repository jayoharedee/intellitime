(function () {
    'use strict';

    angular
        .module('app.user')
        .controller('UserController', UserController);

    UserController.$inject = ['logger',
        '$stateParams',
        '$location',
        'User',
        'TableSettings',
        'UserForm'];
    /* @ngInject */
    function UserController(logger,
        $stateParams,
        $location,
        User,
        TableSettings,
        UserForm) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(User);
        vm.user = {};

        vm.setFormFields = function(disabled) {
            vm.formFields = UserForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new User object
            var user = new User(vm.user);

            // Redirect after save
            user.$save(function(response) {
                logger.success('User created');
                $location.path('users/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing User
        vm.remove = function(user) {

            if (user) {
                user = User.get({userId:user.id}, function() {
                    user.$remove(function() {
                        logger.success('User deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.user.$remove(function() {
                    logger.success('User deleted');
                    $location.path('/users');
                });
            }

        };

        // Update existing User
        vm.update = function() {
            var user = vm.user;

            user.$update(function() {
                logger.success('User updated');
                $location.path('users/' + user.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewUser = function() {
            vm.user = User.get({userId: $stateParams.userId});
            vm.setFormFields(true);
        };

        vm.toEditUser = function() {
            vm.user = User.get({userId: $stateParams.userId});
            vm.setFormFields(false);
        };

        vm.users = [];
        vm.getUsers = function() {
            return User.query(function(user) {
                angular.forEach(user, function(p) {
                    vm.users.push(p)
                })
            });
        };

        activate();

        function activate() {
            //logger.info('Activated User View');
        }
    }

})();
