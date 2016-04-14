(function() {
    'use strict';

    angular
        .module('app.budget')
        .factory('Budget', Budget);

    Budget.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Budget($resource, API_BASE_URL) {

        var params = {
            budgetId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/budgets/:budgetId';

        return $resource(API_URL, params, actions);

    }

})();
