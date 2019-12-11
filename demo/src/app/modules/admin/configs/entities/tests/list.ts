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
        name: 'title',
        key: 'title',
        templateOptions: {
            label: 'Title'
        }
    },
];
