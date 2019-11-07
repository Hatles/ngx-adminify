import {Inject, Injector, ModuleWithProviders, NgModule, Optional, Provider} from '@angular/core';
import {
    AdminifyModule,
    provideAdminAsyncRoutes
} from '@ngx-adminify/core';
import {AdminifyEntityPoolService, ENTITY_POOL_SERVICE_PROVIDER} from './services/adminify-entity-pool-service';
import {ENTITY_SERVICE_PROVIDER, EntityConfig, EntityServiceProvider} from './entity-config';

export function provideEntityPool(injector: Injector): AdminifyEntityPoolService {
    return new AdminifyEntityPoolService(injector);
}

export function provideEntityServiceProviders(providers: EntityServiceProvider[]): Provider[] {
    return providers.map(e => provideEntityServiceProvider(e));

}

export function provideEntityServiceProvider(provider: EntityServiceProvider): Provider {
    return {provide: ENTITY_SERVICE_PROVIDER, multi: true, useValue: provider};
}

@NgModule({
    imports: [
        AdminifyModule,
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
    static fotRoot(entities?: EntityServiceProvider[]): ModuleWithProviders {
        return {
            ngModule: AdminifyEntityModule,
            providers: [
                {
                    provide: AdminifyEntityPoolService, useFactory: provideEntityPool, deps: [Injector]
                },
                ...provideEntityServiceProviders(entities || []),
            ]
        };
    }

    static forChild(config: EntityConfig): ModuleWithProviders {
        return {
            ngModule: AdminifyEntityModule,
            providers: [
                {
                    provide: AdminifyEntityPoolService, useFactory: provideEntityPool, deps: [Injector]
                },
                ...provideEntityServiceProviders(config.entities || []),
                provideAdminAsyncRoutes(config.admin),
            ]
        };
    }

    // static withConfigFactory(factory: AdminConfigFactory, deps?: any[]): ModuleWithProviders {
    //     return {
    //         ngModule: AdminifyEntityModule,
    //         providers: [
    //             provideAdminAsyncRoutesFactory(factory, deps || [])
    //         ]
    //     };
    // }
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
