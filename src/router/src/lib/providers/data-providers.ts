import {
    RouteData, RouteDataProperty, RouteDataPropertySnapshot,
    RouteDataPropertySnapshotToken,
    RouteDataPropertyToken,
    RouteDataSnapshot, RoutePropertySnapshotToken, RoutePropertyToken, TypedRouteData, TypedRouteDataSnapshot
} from '../data/route-data-snapshot';
import {map} from 'rxjs/operators';
import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '../adminify-outlet-route-provider';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

export const routeDataSnapshotProvider: AdminifyOutletRouteProvider = {
    provide: RouteDataSnapshot,
    factory: (route: ActivatedRoute, token: any): RouteDataSnapshot => ({ data: route.snapshot.data }),
    deps: []
};

export const routeDataProvider: AdminifyOutletRouteProvider = {
    provide: RouteData,
    factory: (route: ActivatedRoute, token: any): RouteData => ({ data: route.data }),
    deps: []
};

export const typedRouteDataSnapshotProvider: AdminifyOutletRouteProvider = {
    provide: TypedRouteDataSnapshot,
    factory: (route: ActivatedRoute, token: any): TypedRouteDataSnapshot<any> => ({ data: route.snapshot.data }),
    deps: []
};

export const typedRouteDataProvider: AdminifyOutletRouteProvider = {
    provide: TypedRouteData,
    factory: (route: ActivatedRoute, token: any): TypedRouteData<any> => ({ data: route.data }),
    deps: []
};

export const routeDataPropertySnapshotProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof RouteDataPropertySnapshotToken,
    factory: (route: ActivatedRoute, token: RouteDataPropertySnapshotToken): RouteDataPropertySnapshot<any> => ({ data: route.snapshot.data[token.property] }),
    deps: []
};

export const routeDataPropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof RouteDataPropertyToken,
    factory: (route: ActivatedRoute, token: RouteDataPropertyToken): RouteDataProperty<any> => ({ data: route.data.pipe(map(d => d[token.property])) }),
    deps: []
};

export const routePropertySnapshotProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof RoutePropertySnapshotToken,
    factory: (route: ActivatedRoute, token: RoutePropertySnapshotToken): any => route.snapshot.data[token.property],
    deps: []
};

export const routePropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof RoutePropertyToken,
    factory: (route: ActivatedRoute, token: RoutePropertyToken): Observable<any> => route.data.pipe(map(d => d[token.property])),
    deps: []
};

export const dataProviders: AdminifyOutletRouteProviders = [
    routeDataSnapshotProvider,
    routeDataProvider,
    typedRouteDataSnapshotProvider,
    typedRouteDataProvider,
    routeDataPropertySnapshotProvider,
    routeDataPropertyProvider,
    routePropertySnapshotProvider,
    routePropertyProvider,
];
