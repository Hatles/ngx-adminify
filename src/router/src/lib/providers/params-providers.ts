import {map} from 'rxjs/operators';
import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '../adminify-outlet-route-provider';
import {ActivatedRoute} from '@angular/router';
import {
    RouteParams, RouteParamSnapshotToken,
    RouteParamsProperty,
    RouteParamsPropertySnapshot, RouteParamsPropertySnapshotToken, RouteParamsPropertyToken,
    RouteParamsSnapshot, RouteParamToken, TypedRouteParams,
    TypedRouteParamsSnapshot
} from '../data/route-params-snapshot';

export const routeParamsSnapshotProvider: AdminifyOutletRouteProvider = {
    provide: RouteParamsSnapshot,
    factory: routeParamsSnapshotProviderFactory,
    deps: []
};

export function routeParamsSnapshotProviderFactory(route: ActivatedRoute, token: any): RouteParamsSnapshot {
    return { params: route.snapshot.params };
}

export const routeParamsProvider: AdminifyOutletRouteProvider = {
    provide: RouteParams,
    factory: routeParamsProviderFactory,
    deps: []
};

export function routeParamsProviderFactory(route: ActivatedRoute, token: any): RouteParams {
    return { params: route.params };
}

export const typedRouteParamsSnapshotProvider: AdminifyOutletRouteProvider = {
    provide: TypedRouteParamsSnapshot,
    factory: typedRouteParamsSnapshotProviderFactory,
    deps: []
};

export function typedRouteParamsSnapshotProviderFactory(route: ActivatedRoute, token: any): TypedRouteParamsSnapshot<any> {
    return { params: route.snapshot.params };
}

export const typedRouteParamsProvider: AdminifyOutletRouteProvider = {
    provide: TypedRouteParams,
    factory: typedRouteParamsProviderFactory,
    deps: []
};

export function typedRouteParamsProviderFactory(route: ActivatedRoute, token: any): TypedRouteParams<any> {
    return { params: route.params };
}

export const routeParamsPropertySnapshotProvider: AdminifyOutletRouteProvider = {
    provideFn: routeParamsPropertySnapshotProviderFn,
    factory: routeParamsPropertySnapshotProviderFactory,
    deps: []
};

export function routeParamsPropertySnapshotProviderFn(token: any) {
    return token._type === 'RouteParamsPropertySnapshotToken';
}

export function routeParamsPropertySnapshotProviderFactory(route: ActivatedRoute, token: RouteParamsPropertySnapshotToken): RouteParamsPropertySnapshot<any> {
    return {params: route.snapshot.params[token.property]};
}

export const routeParamsPropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: routeParamsPropertyProviderFn,
    factory: routeParamsPropertyProviderFactory,
    deps: []
};

export function routeParamsPropertyProviderFn(token: any) {
    return token._type === 'RouteParamsPropertyToken';
}

export function routeParamsPropertyProviderFactory(route: ActivatedRoute, token: RouteParamsPropertyToken): RouteParamsProperty<any> {
    return {params: route.params.pipe(map(d => d[token.property]))};
}

export const routeParamSnapshotProvider: AdminifyOutletRouteProvider = {
    provideFn: routeParamSnapshotProviderFn,
    factory: routeParamSnapshotProviderFactory,
    deps: []
};

export function routeParamSnapshotProviderFn(token: any) {
    return token._type === 'RouteParamSnapshotToken';
}

export function routeParamSnapshotProviderFactory(route: ActivatedRoute, token: any): any {
    return route.snapshot.params[token.param];
}

export const routeParamProvider: AdminifyOutletRouteProvider = {
    provideFn: routeParamProviderFn,
    factory: routeParamProviderFactory,
    deps: []
};

export function routeParamProviderFn(token: any) {
    return token._type === 'RouteParamToken';
}

export function routeParamProviderFactory(route: ActivatedRoute, token: any): any {
    return route.params.pipe(map(d => d[token.param]));
}

export const paramsProviders: AdminifyOutletRouteProviders = [
    routeParamsSnapshotProvider,
    routeParamsProvider,
    typedRouteParamsSnapshotProvider,
    typedRouteParamsProvider,
    routeParamsPropertySnapshotProvider,
    routeParamsPropertyProvider,
    routeParamSnapshotProvider,
    routeParamProvider,
];
