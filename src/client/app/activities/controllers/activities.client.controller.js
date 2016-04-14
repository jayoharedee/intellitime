(function () {
    'use strict';

    angular
        .module('app.activity')
        .controller('ActivityController', ActivityController);

    ActivityController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Activity',
        'TableSettings',
        'ActivityForm'];
    /* @ngInject */
    function ActivityController(logger,
        $stateParams,
        $location,
        Activity,
        TableSettings,
        ActivityForm) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Activity);
        vm.activity = {};

        vm.setFormFields = function(disabled) {
            vm.formFields = ActivityForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Activity object
            var activity = new Activity(vm.activity);

            // Redirect after save
            activity.$save(function(response) {
                logger.success('Activity created');
                $location.path('activities/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Activity
        vm.remove = function(activity) {

            if (activity) {
                activity = Activity.get({activityId:activity.id}, function() {
                    activity.$remove(function() {
                        logger.success('Activity deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.activity.$remove(function() {
                    logger.success('Activity deleted');
                    $location.path('/activities');
                });
            }

        };

        // Update existing Activity
        vm.update = function() {
            var activity = vm.activity;

            activity.$update(function() {
                logger.success('Activity updated');
                $location.path('activities/' + activity.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewActivity = function() {
            vm.activity = Activity.get({activityId: $stateParams.activityId});
            vm.setFormFields(true);
        };

        vm.toEditActivity = function() {
            vm.activity = Activity.get({activityId: $stateParams.activityId});
            vm.setFormFields(false);
        };

        vm.activities = [];
        (function() {
            //var projects = new Project();

            Activity.query(function(project) {
                angular.forEach(project, function(p) {
                    vm.activities.push(p);
                })
            })
        }());

        activate();

        function activate() {
            //logger.info('Activated Activity View');
        }
    }

})();
