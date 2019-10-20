import {Routes} from '@angular/router/config';
import {Observable} from 'rxjs';
import {AdminOutletRouteProviders} from '@app/admin/router/adminify-outlet-route-provider';
import {Provider} from '@angular/core';

export type AsyncRoutes = Promise<Routes> | Observable<Routes>;

export interface AsyncRoutesFactory {
    factory: (...deps) => AsyncRoutes;
    deps?: any[];
}

export interface AdminifyRouterConfig {
    providers?: AdminOutletRouteProviders;
    routerConfigLoaderFactoryProvider?: Provider;
}

export interface AdminifyRouterChildConfig {
    providers?: AdminOutletRouteProviders;
    routes: AsyncRoutesFactory;
}
