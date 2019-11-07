import {Admin} from '../../../core/src/lib/admin';
import {AdminPoolService} from '../../../core/src/lib/services/admin-pool-service';
import {EntityAdminConfig} from './entity-admin-config';
import {IAdminifyEntityService} from './adminify-entity-service';
import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '../../../router/src/lib/adminify-outlet-route-provider';

export class EntityAdmin extends Admin /*implements IAdminifyEntityService*/ {

    constructor(pool: AdminPoolService, config: EntityAdminConfig, defaultAdmin: boolean, public entityService: IAdminifyEntityService) {
        super(pool, config, defaultAdmin);
    }

}
