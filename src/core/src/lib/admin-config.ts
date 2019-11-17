import {Route} from '@angular/router';
import {AdminActionConfig} from './admin-action-config';
import {AdminFactory} from './admin-factory';

export type RouteFinder = (Route) => boolean;

export interface AdminsConfig extends BaseAdminsConfig {
    [key: string]: any;
}

interface BaseAdminsConfig extends Route {
    admins: AdminConfig[];
    adminGuards?: any[];
    defaultActionGuards?: any[];
    rootFinder?: RouteFinder;
    defaultRoute?: Route;
    defaultRoutePath?: string;
    defaultAdminName?: string;
    defaultAdminFactory?: AdminFactory;
    wildcardRoute?: Route;
    wildcardRedirectToAdminRoot?: boolean;
    wildcardRedirectToDefaultAdmin?: boolean;
    defaultAdminRouteGuards?: any[]; // CanActivate
    defaultActionRouteGuards?: any[]; // CanActivate
}

export interface AdminConfig extends BaseAdminConfig {
    [key: string]: any;
}

export interface BaseAdminConfig extends Route {
    name: string;
    defaultActionName?: string;
    actions?: AdminActionConfig[];
    adminGuards?: any[];
    actionGuards?: any[];
    factory?: AdminFactory;
    factoryToken?: any;
    defaultActionRouteGuards?: any[]; // CanActivate
}
