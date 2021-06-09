import {EntityAdminConfig} from './entity-admin-config';
import {EntityAdmin} from './entity-admin';
import {AdminComponentDictionary, IAdminFactory} from '@ngx-adminify/core';
import {AdminPoolService} from '@ngx-adminify/core';
import {AdminifyEntityPoolService} from './services/adminify-entity-pool-service';
import {Injectable, Injector} from '@angular/core';

@Injectable()
export class EntityFactory implements IAdminFactory {
    build(injector: Injector, pool: AdminPoolService, config: EntityAdminConfig, isDefaultAdmin: boolean) {
        const entityPool = injector.get(AdminifyEntityPoolService);
        const entityService = entityPool.getEntityService(config.entityService);
        const componentDictionary = injector.get(AdminComponentDictionary);
        return new EntityAdmin(pool, componentDictionary, config, isDefaultAdmin, entityService);
    }
}
