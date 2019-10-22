import {ActivatedRoute} from '@angular/router/router_state';
import {AdminifyOutletRouteProviders} from '@app/admin/router/adminify-outlet-route-provider';
import {Admin} from '@app/admin/core/admin';
import {AdminPoolService} from '@app/admin/core/admin-pool.service';
import {AdminAction} from '@app/admin/core/admin-action';
import {AdminRootRoute} from '@app/admin/core/admin-root-route';
import {AdminActivatedRoute} from '@app/admin/core/admin-activated-route';
import {RouteData} from '@app/admin/core/route-data';
import {getFisrtParentData} from '@app/admin/core/providers/adminify-providers-utils';



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
