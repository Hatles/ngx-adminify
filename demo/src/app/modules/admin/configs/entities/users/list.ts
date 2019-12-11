import {EntityListConfigs} from '@ngx-adminify/entity';

export const list: EntityListConfigs = [
    {
        name: 'id',
        key: 'id',
        templateOptions: {
            label: 'Id'
        }
    },
    {
        name: 'name',
        key: 'name',
        templateOptions: {
            label: 'Name'
        }
    },
    {
        name: 'username',
        key: 'username',
        templateOptions: {
            label: 'Username'
        }
    },
    {
        name: 'email',
        key: 'email',
        templateOptions: {
            label: 'Email'
        }
    },
    {
        name: 'address',
        type: 'template',
        template: '{{address.street}} {{address.city}} {{address.zipcode}}',
        sort: 'address.city',
        templateOptions: {
            label: 'Address'
        }
    },
];
