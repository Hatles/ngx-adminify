import {ActivatedRoute, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {Admin} from '../admin';
import {AdminPoolService} from '../services/admin-pool-service';
import {AdminAction} from '../admin-action';
import {AdminRootRoute} from '../admin-root-route';
import {AdminActivatedRoute} from '../admin-activated-route';
import {RouteData} from '../route-data';
import {getFisrtParentData} from './adminify-providers-utils';

export const routeDataProvider = {
    provide: RouteData,
    factory: (route: ActivatedRoute) => ({ data: route.snapshot.data }),
    deps: []
};

export const adminProvider = {
    provide: Admin,
    factory: (route: ActivatedRoute, pool: AdminPoolService) => {
        return pool.getAdmin(getFisrtParentData(route, 'admin'));
    },
    deps: [AdminPoolService]
};

export const adminActionProvider = {
    provide: AdminAction,
    factory: (route: ActivatedRoute, pool: AdminPoolService) => {
        return pool.getAdmin(getFisrtParentData(route, 'admin')).getAction(getFisrtParentData(route, 'action'));
    },
    deps: [AdminPoolService]
};

export const adminRootRouteProvider = {
    provide: AdminRootRoute,
    factory: (route: ActivatedRoute) => {
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

export const adminActivatedRouteProvider = {
    provide: AdminActivatedRoute,
        factory: (route: ActivatedRoute) => {
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
    routeDataProvider,
    adminProvider,
    adminActionProvider,
    adminRootRouteProvider,
    adminActivatedRouteProvider
];
