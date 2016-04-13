(function() {
    'use strict';

    angular
        .module('app.timesheet')
        .factory('Timesheet', Timesheet);

    Timesheet.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Timesheet($resource, API_BASE_URL) {

        var params = {
            timesheetId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/sheets/:timesheetId';

        return $resource(API_URL, params, actions);

    }

})();
