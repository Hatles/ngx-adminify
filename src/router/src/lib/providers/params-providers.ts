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
    factory: (route: ActivatedRoute, token: any): RouteParamsSnapshot => ({ params: route.snapshot.params }),
    deps: []
};

export const routeParamsProvider: AdminifyOutletRouteProvider = {
    provide: RouteParams,
    factory: (route: ActivatedRoute, token: any): RouteParams => ({ params: route.params }),
    deps: []
};

export const typedRouteParamsSnapshotProvider: AdminifyOutletRouteProvider = {
    provide: TypedRouteParamsSnapshot,
    factory: (route: ActivatedRoute, token: any): TypedRouteParamsSnapshot<any> => ({ params: route.snapshot.params }),
    deps: []
};

export const typedRouteParamsProvider: AdminifyOutletRouteProvider = {
    provide: TypedRouteParams,
    factory: (route: ActivatedRoute, token: any): TypedRouteParams<any> => ({ params: route.params }),
    deps: []
};

export const routeParamsPropertySnapshotProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof RouteParamsPropertySnapshotToken,
    factory: (route: ActivatedRoute, token: RouteParamsPropertySnapshotToken): RouteParamsPropertySnapshot<any> => ({ params: route.snapshot.params[token.property] }),
    deps: []
};

export const routeParamsPropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof RouteParamsPropertyToken,
    factory: (route: ActivatedRoute, token: RouteParamsPropertyToken): RouteParamsProperty<any> => ({ params: route.params.pipe(map(d => d[token.property])) }),
    deps: []
};

export const routeParamSnapshotProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof RouteParamSnapshotToken,
    factory: (route: ActivatedRoute, token: RouteParamSnapshotToken) => route.snapshot.params[token.param],
    deps: []
};

export const routeParamProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof RouteParamToken,
    factory: (route: ActivatedRoute, token: RouteParamToken) => route.params.pipe(map(d => d[token.param])),
    deps: []
};

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
