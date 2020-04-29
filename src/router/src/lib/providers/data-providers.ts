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
    factory: routeDataSnapshotProviderFactory,
    deps: []
};

export function routeDataSnapshotProviderFactory(route: ActivatedRoute, token: any): RouteDataSnapshot {
    return { data: route.snapshot.data };
}

export const routeDataProvider: AdminifyOutletRouteProvider = {
    provide: RouteData,
    factory: routeDataProviderFactory,
    deps: []
};

export function routeDataProviderFactory(route: ActivatedRoute, token: any): RouteDataSnapshot {
    return { data: route.data };
}

export const typedRouteDataSnapshotProvider: AdminifyOutletRouteProvider = {
    provide: TypedRouteDataSnapshot,
    factory: typedRouteDataSnapshotProviderFactory,
    deps: []
};

export function typedRouteDataSnapshotProviderFactory(route: ActivatedRoute, token: any): TypedRouteDataSnapshot<any> {
    return { data: route.snapshot.data };
}

export const typedRouteDataProvider: AdminifyOutletRouteProvider = {
    provide: TypedRouteData,
    factory: typedRouteDataProviderFactory,
    deps: []
};

export function typedRouteDataProviderFactory(route: ActivatedRoute, token: any): TypedRouteData<any> {
    return { data: route.data };
}

export const routeDataPropertySnapshotProvider: AdminifyOutletRouteProvider = {
    provideFn: routeDataPropertySnapshotProviderFn,
    factory: routeDataPropertySnapshotProviderFactory,
    deps: []
};

export function routeDataPropertySnapshotProviderFn(token: any) {
    return token._type === 'RouteDataPropertySnapshotToken';
}

export function routeDataPropertySnapshotProviderFactory(route: ActivatedRoute, token: any): RouteDataPropertySnapshot<any> {
    return { data: route.snapshot.data[token.property] };
}

export const routeDataPropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: routeDataPropertyProviderFn,
    factory: routeDataPropertyProviderFactory,
    deps: []
};

export function routeDataPropertyProviderFactory(route: ActivatedRoute, token: any): RouteDataProperty<any> {
    return { data: route.data.pipe(map(d => d[token.property])) };
}

export function routeDataPropertyProviderFn(token: any): boolean {
    return token._type === 'RouteDataPropertyToken';
}

export const routePropertySnapshotProvider: AdminifyOutletRouteProvider = {
    provideFn: routePropertySnapshotProviderFn,
    factory: routePropertySnapshotProviderFactory,
    deps: []
};

export function routePropertySnapshotProviderFn(token: any): boolean {
    return token._type === 'RoutePropertySnapshotToken';
}

export function routePropertySnapshotProviderFactory(route: ActivatedRoute, token: any): any {
    return route.snapshot.data[token.property] || token.defaultValue;
}

export const routePropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: routePropertyProviderFn,
    factory: routePropertyProviderFactory,
    deps: []
};

export function routePropertyProviderFn(token: any): boolean {
    return token._type === 'RoutePropertyToken';
}

export function routePropertyProviderFactory(route: ActivatedRoute, token: any): Observable<any> {
    return route.data.pipe(map(d => d[token.property] || token.defaultValue));
}

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

