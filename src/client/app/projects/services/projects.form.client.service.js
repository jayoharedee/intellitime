(function() {
    'use strict';

    angular
        .module('app.project')
        .factory('ProjectForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        label: 'Name:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'department',
                    type: 'input',
                    templateOptions: {
                        label: 'Department',
                        disabled: disabled
                    }
                },
                {
                    key: 'lead',
                    type: 'input',
                    templateOptions: {
                        label: 'Lead:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'projectStart',
                    type: 'input',
                    templateOptions: {
                        label: 'Project Start:',
                        disabled: disabled
                    }
                },
                {
                    key: 'projectEnd',
                    type: 'input',
                    templateOptions: {
                        label: 'Project End: ',
                        disabled: disabled
                    }
                },
                {
                    key: 'budget',
                    type: 'input',
                    templateOptions: {
                        label: 'Budget: ',
                        disabled: disabled
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
