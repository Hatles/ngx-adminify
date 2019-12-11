import {EntityConfig} from '@ngx-adminify/entity';
import {admins} from './admins';
import {entityProviders} from './entities';

export const entities: EntityConfig = {
    admin: admins,
    entities: entityProviders
};
