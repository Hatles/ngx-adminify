import {Route} from '@angular/router';
import {AdminActionConfig} from './admin-action-config';

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
    actions?: AdminActionConfig[];
}
