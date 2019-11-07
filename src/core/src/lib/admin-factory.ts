import {Admin} from './admin';
import {AdminPoolService} from './services/admin-pool-service';
import {AdminConfig} from './admin-config';
import {Injector} from '@angular/core';

export type AdminFactory = (injector: Injector, pool: AdminPoolService, config: AdminConfig, isDefaultAdmin: boolean) => Admin;

export const defaultAdminFactory: AdminFactory = (injector: Injector, pool: AdminPoolService, config: AdminConfig, isDefaultAdmin: boolean) => {
    return new Admin(pool, config, isDefaultAdmin);
};
