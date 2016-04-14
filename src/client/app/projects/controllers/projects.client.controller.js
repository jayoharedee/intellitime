(function () {
    'use strict';

    angular
        .module('app.project')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['logger',
        '$stateParams',
        '$location',
        '$resource',
        'Project',
        'ProjectForm'];
    /* @ngInject */
    function ProjectController(logger,
        $stateParams,
        $location,
        $resource,
        Project,
        ProjectForm) {

        var vm = this;

        vm.project = {};

        vm.setFormFields = function(disabled) {
            vm.formFields = ProjectForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Project object
            var project = new Project(vm.project);
            // Redirect after save


            project.$save(function(response) {
                logger.success('Project created');
                $location.path('projects/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.projects = [];
        vm.getProjects = function() {
            return Project.query(function(project) {
               angular.forEach(project, function(p) {
                  vm.projects.push(p)
               })
            });
        };

        // Remove existing Project
        vm.remove = function(project) {

            if (project) {
                project = Project.get({projectId:project.id}, function() {
                    project.$remove(function() {
                        logger.success('Project deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.project.$remove(function() {
                    logger.success('Project deleted');
                    $location.path('/projects');
                });
            }

        };

        // Update existing Project
        vm.update = function() {
            var project = vm.project;

            console.log('edit');
            project.$update(function() {
                logger.success('Project updated');
                $location.path('projects/' + project.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewProject = function() {
            vm.project = Project.get({projectId: $stateParams.projectId});
            vm.setFormFields(true);
        };

        vm.toEditProject = function() {
            vm.project = Project.get({projectId: $stateParams.projectId});
            vm.setFormFields(false);
        };

        //activate();

        function activate() {
            logger.info('Activated Project View');
        }
    }

})();
