(function() {
    'use strict';

    angular
        .module('app.user')
        .factory('User', User);

    User.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function User($resource, API_BASE_URL) {

        var params = {
            userId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/users/:userId';

        return $resource(API_URL, params, actions);

    }

})();
