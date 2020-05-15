import {Data, Route} from '@angular/router';
import {AdminActionConfig} from './admin-action-config';
import {IAdminFactory} from './admin-factory';

export interface AdminsConfig extends BaseAdminsConfig {
    // [key: string]: any;
    adminsData?: Data;
}

interface BaseAdminsConfig extends Route {
    admins: AdminConfig[];
    adminGuards?: any[];
    defaultActionGuards?: any[];
    defaultRoute?: Route;
    defaultRoutePath?: string;
    defaultAdminName?: string;
    defaultAdminFactory?: IAdminFactory;
    defaultAdminFactoryName?: string;
    wildcardRoute?: Route;
    wildcardRedirectToAdminRoot?: boolean;
    wildcardRedirectToDefaultAdmin?: boolean;
    defaultAdminRouteGuards?: any[]; // CanActivate
    defaultActionRouteGuards?: any[]; // CanActivate
    componentName?: string;
}

export interface AdminConfig extends BaseAdminConfig {
    // [key: string]: any;
    adminData?: Data;
}

export interface BaseAdminConfig extends Route {
    name: string;
    label?: string;
    icon?: string;
    defaultActionName?: string;
    actions?: AdminActionConfig[];
    adminGuards?: any[];
    actionGuards?: any[];
    factory?: IAdminFactory;
    factoryName?: string;
    factoryToken?: any;
    defaultActionRouteGuards?: any[]; // CanActivate
    componentName?: string;
}
