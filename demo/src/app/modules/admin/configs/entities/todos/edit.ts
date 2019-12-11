import {FormlyFieldConfig} from '@ngx-formly/core';

export const edit: FormlyFieldConfig[] = [
    {
        key: 'title',
        type: 'input',
    },
    {
        key: 'completed',
        type: 'toggle',
    },
    {
        key: 'userId',
        type: 'entity',
        templateOptions: {
            entity: 'users',
            labelProp: 'name',
        }
    },
];
