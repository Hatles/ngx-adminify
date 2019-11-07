import {EntityAdminConfig, } from '../entity-admin-config';
import {Type} from '@angular/core';
import {AdminifyBuilder, AdminActionConfig, AdminsConfig} from '@ngx-adminify/core';

export interface IAdminifyBuilder {
    getConfig(): AdminsConfig;
}

export interface AdminifyBuilderConfig {
    rootComponent: Type<any>;
    defaultAdminComponent: Type<any>;
    defaultAdminActionComponent: Type<any>;
}

export class AdminifyEntityBuilder extends AdminifyBuilder {

    constructor(builderConfig: AdminifyBuilderConfig) {
        super(builderConfig);
    }

    addEntity(name: string, data?: object, path?: string, component?: Type<any>): AdminifyEntityBuilder {
        if (this.hasAdmin(name)) {
            throw new Error('Admin with name "' + name + '" already exist');
        }

        const admin: EntityAdminConfig = {
            name: name,
            data: data,
            path: path || name,
            component: component || this.builderConfig.defaultAdminComponent,
            actions: [],
            entityService: null
        };

        this.currentAdmin = admin;
        this.config.admins.push(admin);

        return this;
    }

    addEntityAction(name: string, path?: string, component?: Type<any>): AdminifyEntityBuilder {
        if (!this.currentAdmin) {
            throw new Error('No admin is selected');
        }

        if (this.hasAction(name)) {
            throw new Error('Admin with name "' + name + '" already have an action named "' + name + '"');
        }

        const action: AdminActionConfig = {
            name: name,
            path: path || name,
            component: component || this.builderConfig.defaultAdminActionComponent
        };

        this.currentAdmin.actions.push(action);

        return this;
    }

}
