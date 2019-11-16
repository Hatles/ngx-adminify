import {ActivatedRoute, AdminifyOutletRouteProviders, AdminifyOutletRouteProvider} from '@ngx-adminify/router';
import {Admin} from '../admin';
import {AdminPoolService} from '../services/admin-pool-service';
import {AdminAction} from '../admin-action';
import {AdminRootRoute} from '../admin-root-route';
import {AdminActivatedRoute} from '../admin-activated-route';
import {
    RouteData,
    RouteDataPropertySnapshotToken,
    RouteDataPropertyToken,
    RouteDataSnapshot,
    RoutePropertySnapshotToken, RoutePropertyToken
} from '../route-data-snapshot';
import {getFisrtParentData} from './adminify-providers-utils';
import {map} from 'rxjs/operators';

export const routeDataSnapshotProvider: AdminifyOutletRouteProvider = {
    provide: RouteDataSnapshot,
    factory: (route: ActivatedRoute, token: any) => ({ data: route.snapshot.data }),
    deps: []
};

export const routeDataProvider: AdminifyOutletRouteProvider = {
    provide: RouteData,
    factory: (route: ActivatedRoute, token: any) => ({ data: route.data }),
    deps: []
};

export const routeDataPropertySnapshotProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof RouteDataPropertySnapshotToken,
    factory: (route: ActivatedRoute, token: RouteDataPropertySnapshotToken) => ({ data: route.snapshot.data[token.property] }),
    deps: []
};

export const routeDataPropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof RouteDataPropertyToken,
    factory: (route: ActivatedRoute, token: RouteDataPropertyToken) => ({ data: route.data.pipe(map(d => d[token.property])) }),
    deps: []
};

export const routePropertySnapshotProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof RoutePropertySnapshotToken,
    factory: (route: ActivatedRoute, token: RoutePropertySnapshotToken) => route.snapshot.data[token.property],
    deps: []
};

export const routePropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof RoutePropertyToken,
    factory: (route: ActivatedRoute, token: RoutePropertyToken) => route.data.pipe(map(d => d[token.property])),
    deps: []
};

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
    routeDataSnapshotProvider,
    routeDataProvider,
    routeDataPropertySnapshotProvider,
    routeDataPropertyProvider,
    routePropertySnapshotProvider,
    routePropertyProvider,
    adminProvider,
    adminActionProvider,
    adminRootRouteProvider,
    adminActivatedRouteProvider
];
