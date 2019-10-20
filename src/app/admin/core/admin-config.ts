import {Route} from '@angular/router';
import {AdminAction} from './admin-action';

export type RouteFinder = (Route) => boolean;

export interface AdminsConfig extends Route {
    admins: AdminConfig[];
    rootFinder?: RouteFinder;
    defaultRoute?: Route;
    defaultRoutePath?: string;
    defaultAdminName?: string;
    wildcardRoute?: Route;
    wildcardRedirectToAdminRoot?: boolean;
    wildcardRedirectToDefaultAdmin?: boolean;
}

export interface AdminConfig extends Route {
    name: string;
    defaultActionName?: string;
    actions?: AdminAction[];
}
