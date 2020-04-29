import {Compiler, Injectable, Injector, NgModuleFactoryLoader, NgModuleRef, OnDestroy} from '@angular/core';
import {Observable, Subscription, from} from 'rxjs';
import {concatMap, filter, map, mergeAll, mergeMap} from 'rxjs/operators';
import {RouterConfigLoaderFactory} from './router-config-loader-factory';
import {Router} from '../angular/router/router';
import {PreloadingStrategy} from '../angular/router/router_preloader';
import {RouterConfigLoader} from "../angular/router/router_config_loader";
import {LoadedRouterConfig, Route, Routes} from "../angular/router/config";
import {NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart} from "../angular/router/events";


/**
 * The preloader optimistically loads all router configurations to
 * make navigations into lazily-loaded sections of the application faster.
 *
 * The preloader runs in the background. When the router bootstraps, the preloader
 * starts listening to all navigation events. After every such event, the preloader
 * will check if any configurations can be loaded lazily.
 *
 * If a route is protected by `canLoad` guards, the preloaded will not load it.
 *
 * @publicApi
 */
@Injectable()
export class AdminifyRouterPreloader implements OnDestroy {
    private loader: RouterConfigLoader;
    // TODO(issue/24571): remove '!'.
    private subscription !: Subscription;

    constructor(
        private routerConfigLoaderFactory: RouterConfigLoaderFactory,
        private router: Router,
        private injector: Injector,
        private preloadingStrategy: PreloadingStrategy
    ) {

        const onStartLoad = (r: Route) => this.router.triggerEvent(new RouteConfigLoadStart(r));
        const onEndLoad = (r: Route) => this.router.triggerEvent(new RouteConfigLoadEnd(r));

        this.loader = this.routerConfigLoaderFactory.get(onStartLoad, onEndLoad);
    }

    setUpPreloading(): void {
        this.subscription =
            this.router.events
                .pipe(filter((e) => e instanceof NavigationEnd), concatMap(() => this.preload()))
                .subscribe(() => {});
    }

    preload(): Observable<any> {
        const ngModule = this.injector.get(NgModuleRef);
        return this.processRoutes(ngModule, this.router.config);
    }

    // TODO(jasonaden): This class relies on code external to the class to call setUpPreloading. If
    // this hasn't been done, ngOnDestroy will fail as this.subscription will be undefined. This
    // should be refactored.
    ngOnDestroy(): void { this.subscription.unsubscribe(); }

    private processRoutes(ngModule: NgModuleRef<any>, routes: Routes): Observable<void> {
        const res: Observable<any>[] = [];
        for (const route of routes) {
            // we already have the config loaded, just recurse
            if (route.loadChildren && !route.canLoad && route._loadedConfig) {
                const childConfig = route._loadedConfig;
                res.push(this.processRoutes(childConfig.module, childConfig.routes));

                // no config loaded, fetch the config
            } else if (route.loadChildren && !route.canLoad) {
                res.push(this.preloadConfig(ngModule, route));

                // recurse into children
            } else if (route.children) {
                res.push(this.processRoutes(ngModule, route.children));
            }
        }
        return from(res).pipe(mergeAll(), map((_) => void 0));
    }

    private preloadConfig(ngModule: NgModuleRef<any>, route: Route): Observable<void> {
        return this.preloadingStrategy.preload(route, () => {
            const loaded$ = this.loader.load(ngModule.injector, route);
            return loaded$.pipe(mergeMap((config: LoadedRouterConfig) => {
                route._loadedConfig = config;
                return this.processRoutes(config.module, config.routes);
            }));
        });
    }
}
