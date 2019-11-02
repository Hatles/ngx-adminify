import {Admin} from './admin';
import {AdminPoolService} from './services/admin-pool-service';
import {AdminConfig} from './admin-config';

export type AdminFactory = (pool: AdminPoolService, config: AdminConfig, isDefaultAdmin: boolean) => Admin;

export const defaultAdminFactory: AdminFactory = (pool: AdminPoolService, config: AdminConfig, isDefaultAdmin: boolean) => {
    return new Admin(pool, config, isDefaultAdmin);
}
