(function() {
    'use strict';

    angular
        .module('app.project')
        .factory('Project', Project);

    Project.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Project($resource, API_BASE_URL) {

        var params = {
            projectId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/projects/:projectId';

        return $resource(API_URL, params, actions);

    }

})();
