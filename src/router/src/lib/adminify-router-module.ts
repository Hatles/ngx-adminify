import {
    APP_INITIALIZER,
    ApplicationRef,
    Compiler, Inject,
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
    RouterModule,
    ROUTER_CONFIGURATION,
    RouteReuseStrategy,
    RouterPreloader,
    ROUTES,
    UrlHandlingStrategy,
    UrlSerializer
} from './angular/router';
import {ADMINIFY_PROVIDER, AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from './adminify-outlet-route-provider';
import {AdminifyOutletRouteInjectorFactory} from './services/adminify-outlet-route-injector-factory';
import {AdminifyOutlet} from './directives/adminify-outlet';
import {AdminifyRouterChildConfig, AdminifyRouterConfig, AsyncRoutes, AsyncRoutesFactory} from './adminify-router-config';
import {AdminifyEmptyOutletComponent} from './components/adminify-empty-outlet-component';
import {RouterConfigLoaderFactory} from './services/router-config-loader-factory';
import {AdminifyRouterConfigLoaderFactory} from './services/adminify-router-config-loader-factory';
import {AdminifyRouter} from './services/adminify-router';
import {AdminifyRouterPreloader} from './services/adminify-router-preloader';
import {ASYNC_ROUTES} from './services/adminify-router-config-loader';
import {ɵgetDOM as getDOM} from '@angular/platform-browser';
import {Location} from '@angular/common';
import * as router from '@angular/router';
import {RouterModule as ARouterModule} from '@angular/router';
import {dataProviders} from './providers/data-providers';
import {paramsProviders} from './providers/params-providers';

@NgModule({
    imports: [
        ARouterModule
    ],
    exports: [
        ARouterModule,
        AdminifyOutlet
    ],
    declarations: [
        AdminifyOutlet,
        AdminifyEmptyOutletComponent
    ],
    entryComponents: [
        AdminifyEmptyOutletComponent
    ]
    // No provider
})
export class AdminifyRouterModule {
    // save admin components with key for json config
    static fotRoot(config: AdminifyRouterConfig = {}): ModuleWithProviders {
        const dataProvidersList = provideAdminifyProviders(dataProviders);
        const paramsProvidersList = provideAdminifyProviders(paramsProviders);
        const customProvidersList = provideAdminifyProviders(config.providers || []);


        return {
            ngModule: AdminifyRouterModule,
            providers: [
                AdminifyOutletRouteInjectorFactory,
                config.routerConfigLoaderFactoryProvider ? config.routerConfigLoaderFactoryProvider :
                {
                    provide: RouterConfigLoaderFactory,
                    useClass: AdminifyRouterConfigLoaderFactory
                },
                dataProvidersList,
                paramsProvidersList,
                customProvidersList,

                {provide: ROUTES, useExisting: router.ROUTES, multi: true},
                {provide: UrlSerializer, useExisting: router.UrlSerializer},
                {provide: ChildrenOutletContexts, useExisting: router.ChildrenOutletContexts},
                {provide: ROUTER_CONFIGURATION, useExisting: router.ROUTER_CONFIGURATION},
                {provide: RouterPreloader, useClass: AdminifyRouterPreloader},
                {
                    provide: AdminifyRouter,
                    useFactory: setupRouter,
                    deps: [
                        RouterConfigLoaderFactory, ApplicationRef, UrlSerializer, ChildrenOutletContexts, Location, Injector,
                        ROUTES, ROUTER_CONFIGURATION,
                        [UrlHandlingStrategy, new Optional()], [RouteReuseStrategy, new Optional()]
                    ]
                },
                {provide: router.Router, useExisting: AdminifyRouter},
                {provide: Router, useExisting: router.Router},
                {provide: APP_INITIALIZER, useFactory: initRouter, deps: [Injector], multi: true}
            ]
        };
    }

    static forChild(config: AdminifyRouterChildConfig): ModuleWithProviders {
        const providers = [];

        if (config.routes) {
            providers.push(...provideAsyncRoutesFactory(config.routes));
        }

        if (config.providers) {
            providers.push(...provideAdminifyProviders(config.providers));
        }

        return {
            ngModule: AdminifyRouterModule,
            providers: providers
        };
    }

    constructor(
        injectorFactory: AdminifyOutletRouteInjectorFactory,
        @Optional() @Inject(ADMINIFY_PROVIDER) providers: AdminifyOutletRouteProviders = []
    ) {
        if (!providers) {
            return;
        }

        injectorFactory.addProviders(providers);
    }
}

export function provideAdminifyProvider(provider: AdminifyOutletRouteProvider): Provider {
    return {provide: ADMINIFY_PROVIDER, multi: true, useValue: provider};
}

export function provideAdminifyProviders(providers: AdminifyOutletRouteProviders): Provider[] {
    return providers.map(provider => provideAdminifyProvider(provider));
}

export function provideAsyncRoutes(routes: AsyncRoutes): Provider[] {
    return [
        {provide: ASYNC_ROUTES, multi: true, useValue: routes},
    ];
}

export function provideAsyncRoutesByFactory(factory: (...deps) => AsyncRoutes, deps?: any[]): Provider[] {
    const emptyRoutes = {provide: ROUTES, multi: true, useValue: []};

    return [
        {provide: ASYNC_ROUTES, multi: true, useFactory: factory, deps: deps},
        emptyRoutes
    ];
}

export function provideAsyncRoutesFactory(factory: AsyncRoutesFactory): Provider[] {
    const emptyRoutes = {provide: ROUTES, multi: true, useValue: []};

    return [
        {provide: ASYNC_ROUTES, multi: true, useFactory: factory.factory, deps: factory.deps},
        emptyRoutes
    ];
}

export function setupRouter(
    factory: RouterConfigLoaderFactory,
    ref: ApplicationRef, urlSerializer: UrlSerializer, contexts: ChildrenOutletContexts,
    location: Location, injector: Injector,
    config: Route[][], opts: ExtraOptions = {}, urlHandlingStrategy?: UrlHandlingStrategy,
    routeReuseStrategy?: RouteReuseStrategy) {
    // const router = new AdminifyRouter(factory, null, urlSerializer, contexts, location);
    const router = new AdminifyRouter(factory, null, urlSerializer, contexts, location);
    // router.construct(factory, null, urlSerializer, contexts, location);

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
        const router = injector.get(AdminifyRouter);
        router.initRouter(injector).then(config => {
            resolve(config);
        });
    });
}
