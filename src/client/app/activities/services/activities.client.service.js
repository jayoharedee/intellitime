(function() {
    'use strict';

    angular
        .module('app.activity')
        .factory('Activity', Activity);

    Activity.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Activity($resource, API_BASE_URL) {

        var params = {
            activityId: '@id'
        };

        var actions = {
            isArray: true,
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/activities/:activityId';

        return $resource(API_URL, params, actions);

    }

})();
