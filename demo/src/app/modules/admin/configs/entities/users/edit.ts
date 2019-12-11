import {FormlyFieldConfig} from '@ngx-formly/core';

export const edit: FormlyFieldConfig[] = [
    {
        templateOptions: {
            label: 'Form'
        },
        wrappers: [
            'panel'
        ],
        type: 'tab-group',
        fieldGroup: [
            {
                templateOptions: {
                    label: 'Global Info'
                },
                wrappers: [
                    'panel'
                ],
                fieldGroup: [
                    {
                        key: 'name',
                        type: 'input',
                    },
                    {
                        key: 'username',
                        type: 'input',
                        templateOptions: {
                            required: true,
                            label: 'Username',
                            help: 'test help',
                            description: 'test description'
                        }
                    },
                    {
                        key: 'email',
                        type: 'input',
                    },
                ]
            },
            {
                key: 'address',
                templateOptions: {
                    label: 'Address'
                },
                wrappers: [
                    'panel'
                ],
                fieldGroup: [
                    {
                        key: 'street',
                        type: 'input',
                        templateOptions: {
                            required: true,
                            type: 'text',
                            label: 'Street',
                        },
                    },
                    {
                        key: 'suite',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Suite',
                        },
                    },
                    {
                        key: 'city',
                        type: 'input',
                        templateOptions: {
                            required: true,
                            type: 'text',
                            label: 'City',
                        },
                    },
                    {
                        key: 'zipcode',
                        type: 'input',
                        templateOptions: {
                            required: true,
                            type: 'text',
                            label: 'Zipcode',
                        },
                    },
                ],
            }
        ]
    }
];
