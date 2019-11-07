import {EntityAdminConfig} from './entity-admin-config';
import {EntityAdmin} from './entity-admin';
import {AdminFactory} from '../../../core/src/lib/admin-factory';
import {Injector} from '@angular/core';
import {AdminPoolService} from '../../../core/src/lib/services/admin-pool-service';
import {AdminifyEntityPoolService} from './services/adminify-entity-pool-service';

export const entityFactory: AdminFactory = (injector: Injector, pool: AdminPoolService, config: EntityAdminConfig, isDefaultAdmin: boolean) => {
    const entityPool = injector.get(AdminifyEntityPoolService);
    const entityService = entityPool.get(config.entityService);
    return new EntityAdmin(pool, config, isDefaultAdmin, entityService);
};
