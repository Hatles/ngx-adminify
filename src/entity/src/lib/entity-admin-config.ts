import {AdminConfig, AdminsConfig} from '../../../core/src/lib/admin-config';

export interface EntityAdminsConfig extends AdminsConfig {
    admins: EntityAdminConfig[]|AdminConfig[]|any[];
}

export interface EntityAdminConfig extends AdminConfig {
    entityService: any;
}
