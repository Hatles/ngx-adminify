import {Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {Routes, ROUTES} from '@angular/router';
import {AdminPoolService} from './services/admin-pool-service';
import {AdminsConfig} from './admin-config';
import {AsyncRoutes, AsyncRoutesFactory, AdminifyRouterModule, provideAsyncRoutesByFactory, provideAsyncRoutesFactory} from '@ngx-adminify/router';
import {AdminifyBuilder, AdminifyBuilderConfig, IAdminifyBuilder} from './services/adminify-builder';
import {AdminifyLinkDirective, AdminifyLinkWithHrefDirective} from './directives/adminify-link-directive';
import {
    AdminifyActionLinkDirective,
    AdminifyActionLinkWithHrefDirective
} from './directives/adminify-action-link-directive';
import {adminifyProviders} from './providers/admin-providers';
import {AdminRouteGuard} from './guards/admin-route-guard';
import {AdminActionRouteGuard} from './guards/admin-action-route-guard';
import {adminDataProviders} from './providers/admin-data-providers';
import {adminsDataProviders} from './providers/admins-data-providers';
import {actionDataProviders} from './providers/action-data-providers';

@NgModule({
    imports: [
        AdminifyRouterModule.forChild({
            providers: [
                ...adminifyProviders,
                ...adminsDataProviders,
                ...adminDataProviders,
                ...actionDataProviders
            ]
        }),
    ],
    exports: [
        AdminifyRouterModule,
        AdminifyLinkDirective,
        AdminifyLinkWithHrefDirective,
        AdminifyActionLinkDirective,
        AdminifyActionLinkWithHrefDirective
    ],
    declarations: [
        AdminifyLinkDirective,
        AdminifyLinkWithHrefDirective,
        AdminifyActionLinkDirective,
        AdminifyActionLinkWithHrefDirective
    ],
    entryComponents: []
    // No provider
})
export class AdminifyModule {
    // save admin components with key for json config
    static fotRoot(): ModuleWithProviders {
        return {
            ngModule: AdminifyModule,
            providers: [
                AdminPoolService,
                AdminRouteGuard,
                AdminActionRouteGuard
            ]
        };
    }

    static withConfig(config: AdminsConfig): ModuleWithProviders {
        return {
            ngModule: AdminifyModule,
            providers: [
                provideAdminAsyncRoutes(config),
            ]
        };
    }

    static withConfigFactory(factory: AdminConfigFactory, deps?: any[]): ModuleWithProviders {
        return {
            ngModule: AdminifyModule,
            providers: [
                provideAdminAsyncRoutesFactory(factory, deps || [])
            ]
        };
    }

    static withBuilder(builderConfig: AdminifyBuilderConfig, builderFn: (builder: AdminifyBuilder) => void): ModuleWithProviders {
        return {
            ngModule: AdminifyModule,
            providers: [
                provideAdminAsyncRoutesWithBuilder(createAdminifyBuilder(builderConfig, builderFn)),
            ]
        };
    }

    // tslint:disable-next-line:ban-types
    static withBuilderFactory(factory: AdminConfigFactory, deps?: any[]): ModuleWithProviders {
        return {
            ngModule: AdminifyModule,
            providers: [
                // todo
            ]
        };
    }
}

export function provideAdminAsyncRoutes(config: AdminsConfig): Provider[] {
    return [
        provideAsyncRoutesByFactory(buildConfigFactory(config), [AdminPoolService, Injector]),
        {provide: ROUTES, multi: true, useValue: []}
    ];
}

export function provideAdminAsyncRoutesFactory(factory: (...deps: any[]) => Promise<AdminsConfig>, deps: any[]): Provider[] {
    return [
        provideAsyncRoutesFactory(createAsyncRoutesFromAdminsConfig(factory, deps)),
        {provide: ROUTES, multi: true, useValue: []}
    ];
}

// tslint:disable-next-line:max-line-length
export function createAsyncRoutesFromAdminsConfig(configFactory: (...deps: any[]) => Promise<AdminsConfig>, deps: any[]): AsyncRoutesFactory {
    return {
        factory: (pool: AdminPoolService, injector: Injector, ...fdeps: any[]) => {
            return new Promise<Routes>(resolve => {
                const promise: Promise<AdminsConfig> = configFactory.call(null, fdeps.slice(1));
                promise.then(result => {
                    const config = processConfig(result);
                    const routes = pool.buildAdmins(config, injector);
                    resolve(routes);
                });
            });
        },
        deps: [AdminPoolService, Injector, ...deps]
    };
}


export function processConfig(adminsConfig: AdminsConfig) {
    if (!adminsConfig.defaultAdminRouteGuards) {
        adminsConfig.defaultAdminRouteGuards = [AdminRouteGuard];
    }

    if (!adminsConfig.defaultActionRouteGuards) {
        adminsConfig.defaultActionRouteGuards = [AdminActionRouteGuard];
    }

    return adminsConfig;
}


// tslint:disable-next-line:max-line-length
export function createAdminifyBuilder(builderConfig: AdminifyBuilderConfig, builderFn: (builder: AdminifyBuilder) => void): AdminifyBuilder {
    const builder = new AdminifyBuilder(builderConfig);

    builderFn(builder);

    return builder;
}

export function provideAdminAsyncRoutesWithBuilder(builder: IAdminifyBuilder): Provider[] {
    return provideAdminAsyncRoutes(builder.getConfig());
}

export type AdminConfigFactory = (...deps: any[]) => Promise<AdminsConfig>;

export function buildConfigFactory(config: AdminsConfig): (pool: AdminPoolService, injector: Injector) => AsyncRoutes {
    return (pool: AdminPoolService, injector: Injector) => {
        return buildConfig(pool, injector, config);
    };
}

export function buildConfig(pool: AdminPoolService, injector: Injector, config: AdminsConfig): AsyncRoutes {
    return new Promise(resolve => {
        const routes = buildAdmins(pool, injector, config);
        resolve(routes);
    });
}

export function buildConfigFactoryPromise(factory: AdminConfigFactory): (injector: Injector, pool: AdminPoolService) => () => Promise<any> {
    return (injector: Injector, pool: AdminPoolService) => {
        return () => factory(injector).then(config => {
            buildAdmins(pool, injector, config);
            return config;
        });
    };
}

export function buildAdmins(pool: AdminPoolService, injector: Injector, config: AdminsConfig): Routes {
    config = processConfig(config);
    return pool.buildAdmins(config, injector);
}
