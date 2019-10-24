import {AdminConfig, AdminsConfig} from '../admin-config';
import {Type} from '@angular/core';
import {AdminActionConfig} from '../admin-action-config';

export interface IAdminifyBuilder {
    getConfig(): AdminsConfig;
}

export interface AdminifyBuilderConfig {
    rootComponent: Type<any>;
    defaultAdminComponent: Type<any>;
    defaultAdminActionComponent: Type<any>;
}

export class AdminifyBuilder implements IAdminifyBuilder {

    builderConfig: AdminifyBuilderConfig;

    config: AdminsConfig;

    currentAdmin: AdminConfig;

    constructor(builderConfig: AdminifyBuilderConfig) {
        this.builderConfig = builderConfig;
    }

    initConfig(path?: string, data?: object): AdminifyBuilder {
        this.config = {
            admins: [],
            path: path || '',
            data: data,
            component: this.builderConfig.rootComponent
        };

        return this;
    }

    addDashboardAdmin(component: Type<any>, name?: string, path?: string, data?: object): AdminifyBuilder {
        this.config.defaultAdminName = name ? name : 'dashboard';
        return this.addAdmin(this.config.defaultAdminName, data, path ? path : '', component);
    }

    addAdmin(name: string, data?: object, path?: string, component?: Type<any>): AdminifyBuilder {
        if (this.hasAdmin(name)) {
            throw new Error('Admin with name "' + name + '" already exist');
        }

        const admin: AdminConfig = {
            name: name,
            data: data,
            path: path || name,
            component: component || this.builderConfig.defaultAdminComponent,
            actions: []
        };

        this.currentAdmin = admin;
        this.config.admins.push(admin);

        return this;
    }

    hasAdmin(name: string): boolean {
        return this.config.admins.some(a => a.name === name);
    }

    selectAdmin(name: string): AdminifyBuilder {
        const admin = this.config.admins.find(a => a.name === name);

        if (admin) {
            this.currentAdmin = admin;
            return this;
        }

        throw new Error('Admin with name "' + name + '" does not exist');
    }

    addAction(name: string, path?: string, component?: Type<any>): AdminifyBuilder {
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

    hasAction(name: string): boolean {
        if (!this.currentAdmin) {
            throw new Error('No admin is selected');
        }

        return this.currentAdmin.actions.some(a => a.name === name);
    }

    getConfig(): AdminsConfig {
        return this.config;
    }
}
