import {APP_INITIALIZER, Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {RouterModule, Routes, ROUTES} from '@angular/router';
import {AdminPoolService} from './admin-pool.service';
import {AdminsConfig} from './admin-config';
import {AdminOutletRouteProviders} from '@app/admin/router/admin-outlet-route-provider';
import {AdminifyRouterModule, provideAsyncRoutesByFactory} from '@app/admin/router/adminify-router-module';
import {AsyncRoutes} from '@app/admin/router/adminify-router-config';

// tslint:disable-next-line:interface-over-type-literal
export class RouteData {
    data: object;
}

@NgModule({
    imports: [
        AdminifyRouterModule
    ],
    exports: [
        AdminifyRouterModule,
    ],
    declarations: [
    ],
    entryComponents: [
    ]
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
}

export function provideAdminAsyncRoutes(config: AdminsConfig): Provider[] {
    return [
        provideAsyncRoutesByFactory(buildConfigFactory(config), [AdminPoolService]),
        { provide: ROUTES, multi: true, useValue: [] }
    ];
}

export type AdminConfigFactory = (injector: Injector) => Promise<AdminsConfig>;

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
