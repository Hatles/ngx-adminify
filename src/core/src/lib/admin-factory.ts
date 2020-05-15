import {Admin} from './admin';
import {AdminPoolService} from './services/admin-pool-service';
import {AdminConfig} from './admin-config';
import {Injector} from '@angular/core';
import {AdminComponentDictionary} from './admin-component-dictionary';

export interface IAdminFactory {
    build(injector: Injector, pool: AdminPoolService, config: AdminConfig, isDefaultAdmin: boolean): Admin;
}

export class DefaultAdminFactory implements IAdminFactory {
    build(injector: Injector, pool: AdminPoolService, config: AdminConfig, isDefaultAdmin: boolean): Admin {
        return new Admin(pool, injector.get(AdminComponentDictionary), config, isDefaultAdmin);
    }
}
