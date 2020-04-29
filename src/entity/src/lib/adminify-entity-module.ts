import {
    Inject,
    Injectable,
    InjectionToken,
    Injector,
    ModuleWithProviders,
    NgModule,
    Optional,
    Provider
} from '@angular/core';
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
        providers: [provideAdminifyProviders(providers)]
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
        provideAsyncRoutesFactory(createAsyncRoutesFromEntityConfig(deps)),
        EntityFactoryAsyncRouteLoader,
        {provide: ENTITY_CONFIG_FACTORY_TOKEN, useValue: factory},
        {provide: ROUTES, multi: true, useValue: []}
    ];
}

// tslint:disable-next-line:max-line-length
export function createAsyncRoutesFromEntityConfig(deps: any[]): AsyncRoutesFactory {
    return {
        factory: createAsyncRoutesFromEntityConfigFactory,
        deps: [EntityFactoryAsyncRouteLoader, ...deps]
    };
}

@Injectable()
export class EntityFactoryAsyncRouteLoader {

    constructor(private pool: AdminPoolService, private entityPool: AdminifyEntityPoolService, private injector: Injector) {
    }

    getPromise(...fdeps: any[]) {
        return new Promise<Routes>(resolve => {
            const configFactory: (...deps: any[]) => Promise<EntityConfig> = this.injector.get(ENTITY_CONFIG_FACTORY_TOKEN);
            const promise: Promise<EntityConfig> = configFactory.call(null, ...fdeps.slice());
            promise.then(result => {
                this.entityPool.registerProviders(result.entities);
                const config = processConfig(result.admin);
                const routes = this.pool.buildAdmins(config, this.injector);
                resolve(routes);
            });
        });
    }
}

export const ENTITY_CONFIG_FACTORY_TOKEN = new InjectionToken<(...deps: any[]) => Promise<EntityConfig>>('ENTITY_CONFIG_FACTORY_TOKEN');

export function createAsyncRoutesFromEntityConfigFactory(loader: EntityFactoryAsyncRouteLoader, ...fdeps: any[]) {
    return loader.getPromise(fdeps)
}