import {Compiler, InjectionToken, Injector, NgModuleFactory, NgModuleFactoryLoader} from '@angular/core';
import {LoadChildren, ROUTES, Route, Routes, PRIMARY_OUTLET} from '@angular/router';
import {forkJoin, from, Observable, of} from 'rxjs';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {IRouterConfigLoader} from './router-config-loader';
import {LoadedRouterConfig} from "../angular/router/config";
import {flatten, wrapIntoObservable} from "../angular/router/utils/collection";
import {AdminifyEmptyOutletComponent} from "../components/adminify-empty-outlet-component";
import {AsyncRoutes} from '../adminify-router-config';

export interface ModuleInitializer {
    initialize: (...deps: any[]) => Promise<void> | Observable<void>;
    deps?: any[];
}

/**
 * The [DI token](guide/glossary/#di-token) for a router configuration.
 * @see `ROUTES`
 * @publicApi
 */
export const ASYNC_ROUTES = new InjectionToken<AsyncRoutes[]>('ASYNC_ROUTES');
export const MODULE_INITIALIZER = new InjectionToken<ModuleInitializer[]>('MODULE_INITIALIZER');

export class AdminifyRouterConfigLoader implements IRouterConfigLoader {
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
                        return new LoadedRouterConfig(<any>flatten(routes).map(standardizeConfig), module);
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

    const allRoutesObs = forkJoin(asyncRoutesObs).pipe(
        map(routes => ([...injector.get(ROUTES), ...routes]))
    );

    const loadModuleObs = loadModule(injector);

    return loadModuleObs.pipe(switchMap(() => allRoutesObs));
}

export function loadModule(injector: Injector): Observable<any> {
    const moduleInitializers = injector.get(MODULE_INITIALIZER, []);

    if (!moduleInitializers.length) {
        return of(undefined);
    }

    const moduleInitializersObs: Observable<void>[] = moduleInitializers.map(m => {
        const moduleInit = m.initialize.apply(undefined, [...(m.deps || []).map(d => injector.get(d))]);

        if (moduleInit instanceof Promise) {
            return from(moduleInit);
        } else if (moduleInit instanceof Observable) {
            return moduleInit;
        }

        throw new Error('MODULE_INITIALIZER should provide Promise or Observable');
    });

    return forkJoin(moduleInitializersObs);
}

export function standardizeConfig(r: Route): Route {
    const children = r.children && r.children.map(standardizeConfig);
    const c = children ? {...r, children} : {...r};
    if (!c.component && (children || c.loadChildren) && (c.outlet && c.outlet !== PRIMARY_OUTLET)) {
        c.component = AdminifyEmptyOutletComponent;
    }
    return c;
}
