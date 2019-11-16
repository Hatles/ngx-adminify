import {Route} from '@angular/router';
import {AdminActionConfig} from './admin-action-config';
import {AdminFactory} from './admin-factory';
import {AdminActionGuard} from './guards/admin-action-guard';
import {AdminGuard} from './guards/admin-guard';

export type RouteFinder = (Route) => boolean;

export interface AdminsConfig extends Route {
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

export interface AdminConfig extends Route {
    name: string;
    defaultActionName?: string;
    actions?: AdminActionConfig[];
    adminGuards?: any[];
    actionGuards?: any[];
    factory?: AdminFactory;
    factoryToken?: any;
    defaultActionRouteGuards?: any[]; // CanActivate
}
