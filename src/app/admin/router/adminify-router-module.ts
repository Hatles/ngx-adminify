import {
    APP_INITIALIZER,
    ApplicationRef,
    Compiler,
    Injector,
    ModuleWithProviders,
    NgModule,
    NgModuleFactoryLoader,
    Optional,
    Provider
} from '@angular/core';
import {
    ChildrenOutletContexts,
    Event,
    ExtraOptions,
    Route,
    Router,
    ROUTER_CONFIGURATION,
    RouteReuseStrategy,
    RouterModule,
    RouterPreloader,
    ROUTES,
    UrlHandlingStrategy,
    UrlSerializer
} from '@angular/router';
import {AdminOutlet} from '@app/admin/router/admin-outlet';
import {AdminOutletRouteProviders} from '@app/admin/router/admin-outlet-route-provider';
import {AdminOutletRouteInjectorFactory} from '@app/admin/router/admin-outlet-route-injector-factory';
import {AdminEmptyOutletComponent} from '@app/admin/core/components/admin-empty-outlet.service';
import {RouterConfigLoaderFactory} from '@app/admin/router/router-config-loader-factory';
import {AdminRouter} from '@app/admin/router/admin-router';
import {AdminRouterPreloader} from '@app/admin/router/admin-router-preloader';
import {AdminRouterConfigLoaderFactory} from '@app/admin/router/admin-router-config-loader-factory';
import {Location} from '@angular/common';
import {ɵgetDOM as getDOM} from '@angular/platform-browser';
import {ASYNC_ROUTES} from '@app/admin/router/admin-router-config-loader';
import {AdminifyRouterChildConfig, AdminifyRouterConfig, AsyncRoutes, AsyncRoutesFactory} from '@app/admin/router/adminify-router-config';

function buildOutletRouteInjectorFactory(providers: AdminOutletRouteProviders): AdminOutletRouteInjectorFactory {
    return new AdminOutletRouteInjectorFactory(providers);
}

@NgModule({
    imports: [
        RouterModule
    ],
    exports: [
        RouterModule,
        AdminOutlet
    ],
    declarations: [
        AdminOutlet,
        AdminEmptyOutletComponent
    ],
    entryComponents: [
        AdminEmptyOutletComponent
    ]
    // No provider
})
export class AdminifyRouterModule {
    // save admin components with key for json config
    static fotRoot(config: AdminifyRouterConfig): ModuleWithProviders {
        return {
            ngModule: AdminifyRouterModule,
            providers: [
                {
                    provide: AdminOutletRouteInjectorFactory,
                    useValue: buildOutletRouteInjectorFactory(config.providers)
                },
                config.routerConfigLoaderFactoryProvider ? config.routerConfigLoaderFactoryProvider :
                    {
                        provide: RouterConfigLoaderFactory,
                        useClass: AdminRouterConfigLoaderFactory
                    },
                {
                    provide: AdminRouter,
                    useFactory: setupRouter,
                    deps: [
                        RouterConfigLoaderFactory, ApplicationRef, UrlSerializer, ChildrenOutletContexts, Location, Injector,
                        NgModuleFactoryLoader, Compiler, ROUTES, ROUTER_CONFIGURATION,
                        [UrlHandlingStrategy, new Optional()], [RouteReuseStrategy, new Optional()]
                    ]
                },
                {provide: Router, useExisting: AdminRouter},
                {provide: RouterPreloader, useClass: AdminRouterPreloader},
                {provide: APP_INITIALIZER, useFactory: initRouter, deps: [Injector], multi: true}
            ]
        };
    }

    static forChild(config: AdminifyRouterChildConfig): ModuleWithProviders {
        return {
            ngModule: AdminifyRouterModule,
            providers: [
                provideAsyncRoutesFactory(config.routes)
                // todo: update router outlet providers
            ]
        };
    }
}

export function provideAsyncRoutes(routes: AsyncRoutes): Provider[] {
    return [
        {provide: ASYNC_ROUTES, multi: true, useValue: routes},
    ];
}

export function provideAsyncRoutesByFactory(factory: (...deps) => AsyncRoutes, deps?: any[]): Provider {
    return {provide: ASYNC_ROUTES, multi: true, useFactory: factory, deps: deps};
}

export function provideAsyncRoutesFactory(factory: AsyncRoutesFactory): Provider {
    return {provide: ASYNC_ROUTES, multi: true, useFactory: factory.factory, deps: factory.deps};
}

export function setupRouter(
    factory: RouterConfigLoaderFactory,
    ref: ApplicationRef, urlSerializer: UrlSerializer, contexts: ChildrenOutletContexts,
    location: Location, injector: Injector, loader: NgModuleFactoryLoader, compiler: Compiler,
    config: Route[][], opts: ExtraOptions = {}, urlHandlingStrategy?: UrlHandlingStrategy,
    routeReuseStrategy?: RouteReuseStrategy) {
    const router = new AdminRouter(
        factory, null, urlSerializer, contexts, location);

    if (urlHandlingStrategy) {
        router.urlHandlingStrategy = urlHandlingStrategy;
    }

    if (routeReuseStrategy) {
        router.routeReuseStrategy = routeReuseStrategy;
    }

    if (opts.errorHandler) {
        router.errorHandler = opts.errorHandler;
    }

    if (opts.malformedUriErrorHandler) {
        router.malformedUriErrorHandler = opts.malformedUriErrorHandler;
    }

    if (opts.enableTracing) {
        const dom = getDOM();
        router.events.subscribe((e: Event) => {
            // tslint:disable-next-line:whitespace no-angle-bracket-type-assertion
            dom.logGroup(`Router Event: ${(<any> e.constructor).name}`);
            dom.log(e.toString());
            dom.log(e);
            dom.logGroupEnd();
        });
    }

    if (opts.onSameUrlNavigation) {
        router.onSameUrlNavigation = opts.onSameUrlNavigation;
    }

    if (opts.paramsInheritanceStrategy) {
        router.paramsInheritanceStrategy = opts.paramsInheritanceStrategy;
    }

    if (opts.urlUpdateStrategy) {
        router.urlUpdateStrategy = opts.urlUpdateStrategy;
    }

    if (opts.relativeLinkResolution) {
        router.relativeLinkResolution = opts.relativeLinkResolution;
    }

    return router;
}

export function initRouter(injector: Injector) {
    return () => new Promise(resolve => {
        const router = injector.get(AdminRouter);
        router.initRouter(injector).then(config => {
            resolve(config);
        });
    });
}
