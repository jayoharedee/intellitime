(function() {
    'use strict';

    angular
        .module('app.budget')
        .factory('BudgetForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
                {
                    key: 'hours',
                    type: 'input',
                    templateOptions: {
                        label: 'Hours:',
                        disabled: disabled,
                        //required: true
                    }
                },
                {
                    key: 'fiscalYear',
                    type: 'select',
                    templateOptions: {
                        label: 'Fiscal Year:',
                        disabled: disabled,
                        options: [
                            {
                                "name": "2016",
                                "value":"2016"
                            },
                            {
                                "name":"2017",
                                "value":"2017"
                            }
                        ]
                    }
                },
                {
                    key: 'project',
                    type: 'select',
                    templateOptions: {
                        label: 'Project:',
                        options: []
                        //disabled: disabled,
                        //required: true
                    }
                },
                {
                    key: 'user',
                    type: 'select',
                    templateOptions: {
                        label: 'User:',
                        options: []
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
