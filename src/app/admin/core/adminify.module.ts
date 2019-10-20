import {
    APP_INITIALIZER,
    ApplicationRef,
    Compiler,
    Injector,
    ModuleWithProviders,
    NgModule,
    NgModuleFactoryLoader, Optional, Provider,
    Type
} from '@angular/core';
import {
    ChildrenOutletContexts, Event, ExtraOptions, Route,
    Router, ROUTER_CONFIGURATION,
    RouteReuseStrategy,
    RouterModule,
    RouterPreloader,
    ROUTES,
    UrlHandlingStrategy,
    UrlSerializer
} from '@angular/router';
import {AdminPoolService} from './admin-pool.service';
import {AdminsConfig} from './adminConfig';
import {AdminOutlet} from '@app/admin/core/admin-outlet';
import {AdminOutletRouteProviders} from '@app/admin/core/adminOutletRouteProvider';
import {AdminOutletRouteInjectorFactory} from '@app/admin/core/adminOutletRouteInjectorFactory';
import {AdminEmptyOutletComponent} from '@app/admin/core/components/admin-empty-outlet.service';
import {RouterConfigLoaderFactory} from '@app/admin/core/routerConfigLoaderFactory';
import {AdminRouter} from '@app/admin/core/adminRouter';
import {AdminRouterPreloader} from '@app/admin/core/adminRouterPreloader';
import {AdminRouterConfigLoaderFactory} from '@app/admin/core/adminRouterConfigLoaderFactory';
import {Location} from '@angular/common';
import {flatten} from '@angular/router/utils/collection';
import {ɵgetDOM as getDOM} from '@angular/platform-browser';

// tslint:disable-next-line:interface-over-type-literal
export class RouteData {
    data: object;
}

function buildAdminOutletRouteInjectorFactory(providers: AdminOutletRouteProviders): AdminOutletRouteInjectorFactory {
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
export class AdminifyModule {
    // save admin components with key for json config
    static fotRoot(providers: AdminOutletRouteProviders, routerConfigLoaderFactoryProvider?: Provider): ModuleWithProviders {
        return {
            ngModule: AdminifyModule,
            providers: [
                AdminPoolService,
                {provide: AdminOutletRouteInjectorFactory, useValue: buildAdminOutletRouteInjectorFactory(providers), deps: [Injector]},
                routerConfigLoaderFactoryProvider ? routerConfigLoaderFactoryProvider :
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

    static withConfig(config: AdminsConfig, providers?: AdminOutletRouteProviders): ModuleWithProviders {
        return {
            ngModule: AdminifyModule,
            providers: [
                {provide: APP_INITIALIZER, useFactory: buildConfigFactory(config), deps: [Injector, AdminPoolService], multi: true },
                // { provide: APP_INITIALIZER, useFactory: buildProviders(config), deps: [Injector, AdminPoolService], multi: true}
            ]
        };
    }

    // tslint:disable-next-line:ban-types
    static withConfigFactory(factory: AdminConfigFactory): ModuleWithProviders {
        return {
            ngModule: AdminifyModule,
            providers: [
                // tslint:disable-next-line:object-literal-shorthand
                {provide: APP_INITIALIZER, useFactory: buildConfigFactoryPromise(factory), deps: [Injector, AdminPoolService], multi: true}
            ]
        };
    }

    static exploreConfigForComponents(config: AdminsConfig) {
        return undefined;
    }
}

function exploreConfigForComponents(config: AdminsConfig) {
    return undefined;
}

export type AdminConfigFactory = (injector: Injector) => Promise<AdminsConfig>;

export function buildConfigFactory(config: AdminsConfig): (injector: Injector, pool: AdminPoolService) => () => Promise<any> {
    return (injector: Injector, pool: AdminPoolService) => {
        return () => new Promise(resolve => {
            buildAdmins(null, pool, config);
            resolve();
        });
    };
}

// export function buildProviders(providers: AdminOutletRouteProviders): (: Injector, pool: AdminPoolService) => () => Promise<any> {
//     return (injector: Injector, pool: AdminPoolService) => {
//         return () => new Promise(resolve => {
//             buildAdmins(null, pool, config);
//             resolve();
//         });
//     };
// }

export function buildConfigFactoryPromise(factory: AdminConfigFactory): (injector: Injector, pool: AdminPoolService) => () => Promise<any> {
    return (injector: Injector, pool: AdminPoolService) => {
        return () => factory(injector).then(config => {
            buildAdmins(null, pool, config);
            return config;
        });
    };
}

export function buildAdmins(router: Router, pool: AdminPoolService, config: AdminsConfig) {
    pool.buildAdmins(router, config);
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
