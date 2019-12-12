import {FormlyFieldConfig} from '@ngx-formly/core';

export const edit: FormlyFieldConfig[] = [
    {
        key: 'title',
        type: 'input',
        templateOptions: {
            required: true
        }
    },
    {
        key: 'description',
        type: 'textarea',
        templateOptions: {
            required: true
        }
    },
];
