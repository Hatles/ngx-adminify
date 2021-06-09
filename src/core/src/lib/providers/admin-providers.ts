import {AdminifyOutletRouteProviders, AdminifyOutletRouteProvider} from '@ngx-adminify/router';
import {Admin} from '../admin';
import {AdminPoolService} from '../services/admin-pool-service';
import {AdminAction} from '../admin-action';
import {AdminRootRoute} from '../admin-root-route';
import {AdminActivatedRoute} from '../admin-activated-route';
import {getFirstParentData} from './adminify-providers-utils';
import {ActivatedRoute} from '@angular/router';


export const adminProvider: AdminifyOutletRouteProvider = {
    provide: Admin,
    useFactory: adminProviderFn,
    deps: [AdminPoolService]
};
export function adminProviderFn(route: ActivatedRoute, token: any, pool: AdminPoolService) {
    return pool.getAdmin(getFirstParentData(route, 'admin'));
}

export const adminActionProvider: AdminifyOutletRouteProvider = {
    provide: AdminAction,
    useFactory: adminActionProviderFn,
    deps: [AdminPoolService]
};
export function adminActionProviderFn(route: ActivatedRoute, token: any, pool: AdminPoolService) {
    return pool.getAdmin(getFirstParentData(route, 'admin')).getAction(getFirstParentData(route, 'action'));
}

export const adminRootRouteProvider: AdminifyOutletRouteProvider = {
    provide: AdminRootRoute,
    useFactory: adminRootRouteProviderFn,
    deps: []
};
export function adminRootRouteProviderFn(route: ActivatedRoute, token: any) {
    if (route.snapshot.data.adminRoot) {
        return route;
    }

    while (route.parent) {
        route = route.parent;

        if (route.snapshot.data.adminRoot) {
            return route;
        }
    }

    throw new Error('Can\'t find admin root');
}

export const adminActivatedRouteProvider: AdminifyOutletRouteProvider = {
    provide: AdminActivatedRoute,
        useFactory: adminActivatedRouteProviderFn,
        deps: []
};
export function adminActivatedRouteProviderFn(route: ActivatedRoute, token: any) {
    if (route.snapshot.data.admin && (!route.parent || !route.parent.snapshot.data.admin)) {
        return route;
    }

    while (route.parent) {
        route = route.parent;

        if (route.snapshot.data.admin && (!route.parent || !route.parent.snapshot.data.admin)) {
            return route;
        }
    }

    throw new Error('Can\'t find admin activated route');
}

export const adminifyProviders: AdminifyOutletRouteProviders = [
    adminProvider,
    adminActionProvider,
    adminRootRouteProvider,
    adminActivatedRouteProvider
];
