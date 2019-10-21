import {Routes} from '@angular/router/config';
import {Observable} from 'rxjs';
import {AdminifyOutletRouteProviders} from '@app/admin/router/adminify-outlet-route-provider';
import {Provider} from '@angular/core';

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
