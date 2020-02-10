import {AdminConfig, AdminsConfig} from '@ngx-adminify/core';

export interface EntityAdminsConfig extends AdminsConfig {
    admins: EntityAdminConfig[]|AdminConfig[]|any[];
}

export interface EntityAdminConfig extends AdminConfig {
    entityService: any;
}
