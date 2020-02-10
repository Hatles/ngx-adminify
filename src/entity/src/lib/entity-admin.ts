import {Admin, AdminComponentDictionary, AdminPoolService} from '@ngx-adminify/core';
import {EntityAdminConfig} from './entity-admin-config';
import {IAdminifyEntityService} from './adminify-entity-service';

export class EntityAdmin extends Admin /*implements IAdminifyEntityService*/ {

    constructor(pool: AdminPoolService, componentDictionary: AdminComponentDictionary, config: EntityAdminConfig, defaultAdmin: boolean, public entityService: IAdminifyEntityService) {
        super(pool, componentDictionary, config, defaultAdmin);
    }

}
