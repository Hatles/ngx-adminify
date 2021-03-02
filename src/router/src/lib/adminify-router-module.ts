import {
    APP_INITIALIZER,
    ApplicationRef,
    Inject, Injectable,
    Injector,
    ModuleWithProviders,
    NgModule,
    Optional,
    Provider
} from '@angular/core';
import {
    Router,
} from './angular/router/router';
import {
    ADMINIFY_PROVIDER,
    ADMINIFY_PROVIDER_ARRAY, AdminifyOutletRouteProvider,
    AdminifyOutletRouteProviders
} from './adminify-outlet-route-provider';
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
import {Location, LOCATION_INITIALIZED} from '@angular/common';
import * as router from '@angular/router';
import {RouterModule as ARouterModule} from '@angular/router';
import {dataProviders} from './providers/data-providers';
import {paramsProviders} from './providers/params-providers';
import {ROUTES} from "./angular/router/router_config_loader";
import {ChildrenOutletContexts} from "./angular/router/router_outlet_context";
import {ExtraOptions, ROUTER_CONFIGURATION, RouterInitializer} from "./angular/router/router_module";
import {RouterPreloader} from "./angular/router/router_preloader";
import {UrlSerializer} from "./angular/router/url_tree";
import {UrlHandlingStrategy} from "./angular/router/url_handling_strategy";
import {Route} from "./angular/router/config";
import {RouteReuseStrategy} from "./angular/router/route_reuse_strategy";
import {Event} from '@angular/router';

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
        return {
            ngModule: AdminifyRouterModule,
            providers: [
                AdminifyOutletRouteInjectorFactory,
                config.routerConfigLoaderFactoryProvider ? config.routerConfigLoaderFactoryProvider :
                {
                    provide: RouterConfigLoaderFactory,
                    useClass: AdminifyRouterConfigLoaderFactory
                },
                provideAdminifyProviders(dataProviders),
                provideAdminifyProviders(paramsProviders),
                provideAdminifyProviders(config.providers || []),

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
                AdminifyRouterInitializer,
                {provide: APP_INITIALIZER, useFactory: getAppInitializer, deps: [AdminifyRouterInitializer], multi: true}
            ]
        };
    }

    static forChild(config: AdminifyRouterChildConfig): ModuleWithProviders {
        return {
            ngModule: AdminifyRouterModule,
            providers: [
                config.routes ? provideAsyncRoutesFactory(config.routes) : [],
                config.providers ? provideAdminifyProviders(config.providers) : []
            ]
        };
    }

    constructor(
        injectorFactory: AdminifyOutletRouteInjectorFactory,
        @Optional() @Inject(ADMINIFY_PROVIDER) providers: AdminifyOutletRouteProviders = [],
        @Optional() @Inject(ADMINIFY_PROVIDER_ARRAY) providersArr: AdminifyOutletRouteProviders[] = [],
    ) {
        if (!!providers) {
            injectorFactory.addProviders(providers);
        }
        if (!!providersArr) {
            providersArr.forEach(ps => injectorFactory.addProviders(ps))
        }
    }
}

export function provideAdminifyProvider(provider: AdminifyOutletRouteProvider): Provider {
    return {provide: ADMINIFY_PROVIDER, multi: true, useValue: provider};
}

export function provideAdminifyProviders(providers: AdminifyOutletRouteProviders): Provider {
    return {provide: ADMINIFY_PROVIDER_ARRAY, multi: true, useValue: providers};
}

export function provideAsyncRoutes(routes: AsyncRoutes): Provider[] {
    return [
        {provide: ASYNC_ROUTES, multi: true, useValue: routes},
    ];
}

export function provideAsyncRoutesByFactory(factory: (...deps) => AsyncRoutes, deps?: any[]): Provider[] {
    return [
        {provide: ASYNC_ROUTES, multi: true, useFactory: factory, deps: deps},
        {provide: ROUTES, multi: true, useValue: []}
    ];
}

export function provideAsyncRoutesFactory(factory: AsyncRoutesFactory): Provider[] {
    return [
        {provide: ASYNC_ROUTES, multi: true, useFactory: factory.factory, deps: factory.deps},
        {provide: ROUTES, multi: true, useValue: []}
    ];
}

export function setupRouter(
    factory: RouterConfigLoaderFactory,
    ref: ApplicationRef, urlSerializer: UrlSerializer, contexts: ChildrenOutletContexts,
    location: Location, injector: Injector,
    config: Route[][], opts: ExtraOptions = {}, urlHandlingStrategy?: UrlHandlingStrategy,
    routeReuseStrategy?: RouteReuseStrategy) {
    const router = new AdminifyRouter(factory, null, urlSerializer, contexts, location, injector);

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

export function getAppInitializer(r: AdminifyRouterInitializer) {
    return r.appInitializer.bind(r);
}

@Injectable()
export class AdminifyRouterInitializer {

    constructor(private injector: Injector) {}

    appInitializer(): Promise<any> {
        return new Promise(resolve => {
            const router = this.injector.get(AdminifyRouter);
            router.initRouter(this.injector).then(config => {
                resolve(config);
            });
        });
    }
}
