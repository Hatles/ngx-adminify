import {EntityAdminConfig} from './entity-admin-config';
import {EntityAdmin} from './entity-admin';
import {AdminComponentDictionary, AdminFactory} from '@ngx-adminify/core';
import {AdminPoolService} from '@ngx-adminify/core';
import {AdminifyEntityPoolService} from './services/adminify-entity-pool-service';
import {Injector} from "@angular/core";

export const entityFactory: AdminFactory = (injector: Injector, pool: AdminPoolService, config: EntityAdminConfig, isDefaultAdmin: boolean) => {
    const entityPool = injector.get(AdminifyEntityPoolService);
    const entityService = entityPool.getEntityService(config.entityService);
    const componentDictionary = injector.get(AdminComponentDictionary);
    return new EntityAdmin(pool, componentDictionary, config, isDefaultAdmin, entityService);
};
