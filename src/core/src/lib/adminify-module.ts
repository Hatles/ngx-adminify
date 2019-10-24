import {Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {Routes, ROUTES} from '@angular/router';
import {AdminPoolService} from './services/admin-pool-service';
import {AdminsConfig} from './admin-config';
import {AsyncRoutes, AsyncRoutesFactory, AdminifyRouterModule, provideAsyncRoutesByFactory, provideAsyncRoutesFactory} from '@ngx-adminify/router';
import {AdminifyBuilder, AdminifyBuilderConfig, IAdminifyBuilder} from './services/adminify-builder';
import {AdminifyLinkDirective} from './directives/adminify-link-directive';
import {AdminifyActionLinkDirective} from './directives/adminify-action-link-directive';
import {adminifyProviders} from './providers/admin-providers';

@NgModule({
    imports: [
        AdminifyRouterModule.forChild({
            providers: adminifyProviders
        }),
    ],
    exports: [
        AdminifyRouterModule,
        AdminifyLinkDirective,
        AdminifyActionLinkDirective
    ],
    declarations: [
        AdminifyLinkDirective,
        AdminifyActionLinkDirective
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
        provideAsyncRoutesByFactory(buildConfigFactory(config), [AdminPoolService]),
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
        factory: (pool: AdminPoolService, ...fdeps: any[]) => {
            return new Promise<Routes>(resolve => {
                const promise: Promise<AdminsConfig> = configFactory.call(null, fdeps.slice(1));
                promise.then(result => {
                    const routes = pool.buildAdmins(result);
                    resolve(routes);
                });
            });
        },
        deps: [AdminPoolService, ...deps]
    };
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

export function buildConfigFactory(config: AdminsConfig): (pool: AdminPoolService) => AsyncRoutes {
    return (pool: AdminPoolService) => {
        return buildConfig(pool, config);
    };
}

export function buildConfig(pool: AdminPoolService, config: AdminsConfig): AsyncRoutes {
    return new Promise(resolve => {
        const routes = buildAdmins(pool, config);
        resolve(routes);
    });
}

export function buildConfigFactoryPromise(factory: AdminConfigFactory): (injector: Injector, pool: AdminPoolService) => () => Promise<any> {
    return (injector: Injector, pool: AdminPoolService) => {
        return () => factory(injector).then(config => {
            buildAdmins(pool, config);
            return config;
        });
    };
}

export function buildAdmins(pool: AdminPoolService, config: AdminsConfig): Routes {
    return pool.buildAdmins(config);
}
