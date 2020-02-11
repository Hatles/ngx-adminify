import {Inject, Injector, ModuleWithProviders, NgModule, Optional, Provider} from '@angular/core';
import {
    actionDataProviders,
    adminDataProviders,
    AdminifyModule, adminifyProviders, adminsDataProviders,
    provideAdminAsyncRoutes
} from '@ngx-adminify/core';
import {AdminifyEntityPoolService} from './services/adminify-entity-pool-service';
import {ENTITY_SERVICE_PROVIDER, EntityConfig, EntityServiceProvider} from './entity-config';
import {AdminifyRouterModule, provideAdminifyProviders, provideAsyncRoutesFactory} from '@ngx-adminify/router';
import {adminifyEntityGenericProviders} from './providers/entity-service-generic-providers';
import {AdminPoolService, processConfig} from '@ngx-adminify/core';
import {Routes, ROUTES} from '@angular/router';
import {AsyncRoutesFactory} from '@ngx-adminify/router';
import {adminifyEntityActionProviders} from './providers/entity-action-config-providers';

export function provideEntityServiceProviders(entityServiceProviders: EntityServiceProvider[]): Provider[] {
    const providers = entityServiceProviders.map(e => provideEntityServiceProvider(e));
    return providers;
}

export function provideEntityServiceProvider(provider: EntityServiceProvider): Provider {
    return {provide: ENTITY_SERVICE_PROVIDER, multi: true, useValue: provider};
}

const providers = [
    ...adminifyEntityGenericProviders,
    ...adminifyEntityActionProviders
];

const adminifyRouterModuleImport =
    {
        ngModule: AdminifyRouterModule,
        providers: provideAdminifyProviders(providers)
    };

@NgModule({
    imports: [
        AdminifyModule,
        adminifyRouterModuleImport
    ],
    exports: [
        AdminifyModule,
    ],
    declarations: [
    ],
    entryComponents: []
    // No provider
})
export class AdminifyEntityModule {
    // save admin components with key for json config
    static fotRoot(): ModuleWithProviders {
        return {
            ngModule: AdminifyEntityModule,
            providers: [
                AdminifyEntityPoolService
            ]
        };
    }

    static forChild(config: EntityConfig): ModuleWithProviders {
        return {
            ngModule: AdminifyEntityModule,
            providers: [
                AdminifyEntityPoolService,
                ...provideEntityServiceProviders(config.entities || []),
                provideAdminAsyncRoutes(config.admin),
            ]
        };
    }

    static withConfigFactory(factory: EntityConfigFactory, deps?: any[]): ModuleWithProviders {
        return {
            ngModule: AdminifyEntityModule,
            providers: [
                AdminifyEntityPoolService,
                provideEntityAsyncRoutesFactory(factory, deps || [])
            ]
        };
    }
    //
    // static withBuilder(builderConfig: AdminifyBuilderConfig, builderFn: (builder: AdminifyBuilder) => void): ModuleWithProviders {
    //     return {
    //         ngModule: AdminifyEntityModule,
    //         providers: [
    //             provideAdminAsyncRoutesWithBuilder(createAdminifyBuilder(builderConfig, builderFn)),
    //         ]
    //     };
    // }
    //
    // // tslint:disable-next-line:ban-types
    // static withBuilderFactory(factory: AdminConfigFactory, deps?: any[]): ModuleWithProviders {
    //     return {
    //         ngModule: AdminifyModule,
    //         providers: [
    //             // todo
    //         ]
    //     };
    // }

    constructor(
        pool: AdminifyEntityPoolService,
        @Optional() @Inject(ENTITY_SERVICE_PROVIDER) providers: EntityServiceProvider[] = []
    ) {
        if (!providers) {
            return;
        }

        pool.buildEntities(providers);
    }
}

export type EntityConfigFactory = (...deps: any[]) => Promise<EntityConfig>;

export function provideEntityAsyncRoutesFactory(factory: (...deps: any[]) => Promise<EntityConfig>, deps: any[]): Provider[] {
    return [
        provideAsyncRoutesFactory(createAsyncRoutesFromEntityConfig(factory, deps)),
        {provide: ROUTES, multi: true, useValue: []}
    ];
}

// tslint:disable-next-line:max-line-length
export function createAsyncRoutesFromEntityConfig(configFactory: (...deps: any[]) => Promise<EntityConfig>, deps: any[]): AsyncRoutesFactory {
    const factory = createAsyncRoutesFromEntityConfigFactory(configFactory);
    return {
        factory: factory,
        deps: [AdminPoolService, AdminifyEntityPoolService, Injector, ...deps]
    };
}

export function createAsyncRoutesFromEntityConfigFactory(configFactory: (...deps: any[]) => Promise<EntityConfig>) {
    const fn = (pool: AdminPoolService, entityPool: AdminifyEntityPoolService, injector: Injector, ...fdeps: any[]) => {
        return new Promise<Routes>(resolve => {
            const promise: Promise<EntityConfig> = configFactory.call(null, ...fdeps.slice());
            promise.then(result => {
                entityPool.registerProviders(result.entities);
                const config = processConfig(result.admin);
                const routes = pool.buildAdmins(config, injector);
                resolve(routes);
            });
        });
    };
    return fn;
}