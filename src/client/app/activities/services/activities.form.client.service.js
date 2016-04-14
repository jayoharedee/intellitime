(function() {
    'use strict';

    angular
        .module('app.activity')
        .factory('ActivityForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
                {
                    key: 'activityName',
                    type: 'input',
                    templateOptions: {
                        label: 'Activity Name:',
                        disabled: disabled,
                        required: true
                    }
                }
            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;

    }

})();
