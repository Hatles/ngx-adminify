import {ROUTES} from '@angular/router/router_config_loader';
import {Compiler, InjectionToken, Injector, NgModuleFactory, NgModuleFactoryLoader} from '@angular/core';
import {LoadChildren, LoadedRouterConfig, Route, Routes} from '@angular/router/config';
import {forkJoin, from, Observable, of} from 'rxjs';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {flatten, wrapIntoObservable} from '@angular/router/utils/collection';
import {IRouterConfigLoader} from '@app/admin/router/router-config-loader';
import {PRIMARY_OUTLET} from '@angular/router/shared';
import {AdminEmptyOutletComponent} from '@app/admin/core/components/admin-empty-outlet.service';

/**
 * The [DI token](guide/glossary/#di-token) for a router configuration.
 * @see `ROUTES`
 * @publicApi
 */
export const ASYNC_ROUTES = new InjectionToken<Route[][]>('ASYNC_ROUTES');

export class AdminRouterConfigLoader implements IRouterConfigLoader {
    constructor(
        private loader: NgModuleFactoryLoader, private compiler: Compiler,
        private onLoadStartListener?: (r: Route) => void,
        private onLoadEndListener?: (r: Route) => void) {
    }

    load(parentInjector: Injector, route: Route): Observable<LoadedRouterConfig> {
        if (this.onLoadStartListener) {
            this.onLoadStartListener(route);
        }

        // tslint:disable-next-line:no-non-null-assertion
        const moduleFactory$ = this.loadModuleFactory(route.loadChildren !);

        return moduleFactory$.pipe(
            switchMap((factory: NgModuleFactory<any>) => {
                if (this.onLoadEndListener) {
                    this.onLoadEndListener(route);
                }

                const module = factory.create(parentInjector);

                return loadConfig(module.injector).pipe(
                    map(routes => {
                        return new LoadedRouterConfig(flatten(routes).map(standardizeConfig), module);
                    })
                );
            }));
    }

    private loadModuleFactory(loadChildren: LoadChildren): Observable<NgModuleFactory<any>> {
        if (typeof loadChildren === 'string') {
            return from(this.loader.load(loadChildren));
        } else {
            return wrapIntoObservable(loadChildren()).pipe(mergeMap((t: any) => {
                if (t instanceof NgModuleFactory) {
                    return of(t);
                } else {
                    return from(this.compiler.compileModuleAsync(t));
                }
            }));
        }
    }
}

export function loadConfig(injector: Injector): Observable<Routes[]> {
    const asyncRoutes = injector.get(ASYNC_ROUTES, []);
    const test = injector.get(ROUTES);

    if (!asyncRoutes.length) {
        return of(injector.get(ROUTES));
    }

    const asyncRoutesObs: Observable<Routes>[] = asyncRoutes.map(r => {
        if (r instanceof Promise) {
            return from(r);
        } else if (r instanceof Observable) {
            return r;
        }

        throw new Error('ASYNC_ROUTES should provide Promise or Observable');
    });

    return forkJoin(asyncRoutesObs).pipe(
        map(routes => ([...injector.get(ROUTES), ...routes]))
    );
}

export function standardizeConfig(r: Route): Route {
    const children = r.children && r.children.map(standardizeConfig);
    const c = children ? {...r, children} : {...r};
    if (!c.component && (children || c.loadChildren) && (c.outlet && c.outlet !== PRIMARY_OUTLET)) {
        c.component = AdminEmptyOutletComponent;
    }
    return c;
}
