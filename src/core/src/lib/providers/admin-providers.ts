import {AdminifyOutletRouteProviders, AdminifyOutletRouteProvider} from '@ngx-adminify/router';
import {Admin} from '../admin';
import {AdminPoolService} from '../services/admin-pool-service';
import {AdminAction} from '../admin-action';
import {AdminRootRoute} from '../admin-root-route';
import {AdminActivatedRoute} from '../admin-activated-route';
import {getFisrtParentData} from './adminify-providers-utils';
import {ActivatedRoute} from '@angular/router';


export const adminProvider: AdminifyOutletRouteProvider = {
    provide: Admin,
    factory: (route: ActivatedRoute, token: any, pool: AdminPoolService) => {
        return pool.getAdmin(getFisrtParentData(route, 'admin'));
    },
    deps: [AdminPoolService]
};

export const adminActionProvider: AdminifyOutletRouteProvider = {
    provide: AdminAction,
    factory: (route: ActivatedRoute, token: any, pool: AdminPoolService) => {
        return pool.getAdmin(getFisrtParentData(route, 'admin')).getAction(getFisrtParentData(route, 'action'));
    },
    deps: [AdminPoolService]
};

export const adminRootRouteProvider: AdminifyOutletRouteProvider = {
    provide: AdminRootRoute,
    factory: (route: ActivatedRoute, token: any) => {
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
    },
    deps: []
};

export const adminActivatedRouteProvider: AdminifyOutletRouteProvider = {
    provide: AdminActivatedRoute,
        factory: (route: ActivatedRoute, token: any) => {
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
    },
        deps: []
};

export const adminifyProviders: AdminifyOutletRouteProviders = [
    adminProvider,
    adminActionProvider,
    adminRootRouteProvider,
    adminActivatedRouteProvider
];
