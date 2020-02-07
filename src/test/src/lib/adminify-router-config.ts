import {Routes} from '@angular/router';
import {Observable} from 'rxjs';
import {Provider} from '@angular/core';
import {AdminifyOutletRouteProviders} from './adminify-outlet-route-provider';

export type AsyncRoutes = Promise<Routes> | Observable<Routes>;

export interface AsyncRoutesFactory {
    factory: (...deps) => AsyncRoutes;
    deps?: any[];
}

export interface AdminifyRouterConfig {
    providers?: AdminifyOutletRouteProviders;
    routerConfigLoaderFactoryProvider?: Provider;
}

export interface AdminifyRouterChildConfig {
    providers?: AdminifyOutletRouteProviders;
    routes?: AsyncRoutesFactory;
}
