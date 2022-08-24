import {ModuleWithProviders, NgModule, Provider} from "@angular/core";
import {RouterModule, Routes, ROUTES} from "@angular/router";
import {EmptyOutletComponent} from "./components/empty-outlet.component";
import {AsyncItemRegistry, provideAsyncInitializer} from "./async-initializer";
import {
    ASYNC_ROUTES,
    AsyncRoutes,
    AsyncRoutesFactory,
    AsyncRoutesFactoryDefinition,
    provideAsyncRoutesInitializer
} from "./async-routes";
import {dataProviders} from "./providers/data-providers";
import {paramsProviders} from "./providers/params-providers";
import {AdminifyOutlet} from "./directives/adminify-outlet";
import {
    ADMINIFY_PROVIDER,
    ADMINIFY_PROVIDER_ARRAY,
    AdminifyOutletRouteProvider,
    AdminifyOutletRouteProviders
} from "./providers/providers";
import {AdminifyOutletRouteInjectorFactory} from "./services/adminify-outlet-route-injector-factory";

export interface AdminifyRouterConfig {
    routes?: Routes,
    asyncRoutes?: AsyncRoutes,
    asyncRoutesFactory?: AsyncRoutesFactoryDefinition,
    asyncRoutesFactories?: AsyncRoutesFactoryDefinition[],
    outletProviders?: AdminifyOutletRouteProviders
}

@NgModule({
    imports: [RouterModule],
    declarations: [
        EmptyOutletComponent,
        AdminifyOutlet
    ],
    exports: [
        RouterModule,
        EmptyOutletComponent,
        AdminifyOutlet
    ]
})
export class AdminifyRouterModule {
    static forRoot(config: AdminifyRouterConfig = {}): ModuleWithProviders<AdminifyRouterModule> {
        return {
            ngModule: AdminifyRouterModule,
            providers: [
                AdminifyOutletRouteInjectorFactory,

                AsyncItemRegistry,
                provideAsyncInitializer(),
                provideAsyncRoutesInitializer(),

                provideAdminifyProviders([
                    ...dataProviders,
                    ...paramsProviders,
                ]),
                buildProvidersFromConfig(config)
            ],
        };
    }

    static forChild(config: AdminifyRouterConfig = {}): ModuleWithProviders<AdminifyRouterModule> {
        return {
            ngModule: AdminifyRouterModule,
            providers: [
                AdminifyOutletRouteInjectorFactory,

                AsyncItemRegistry,
                provideAsyncInitializer(),
                provideAsyncRoutesInitializer(),

                buildProvidersFromConfig(config)
            ],
        };
    }
}

export function buildProvidersFromConfig(config: AdminifyRouterConfig): Provider[] {
    return [
        ...(config.routes ? [provideRoutes(config.routes)] : []),
        ...(config.asyncRoutes ? [provideAsyncRoutes(config.asyncRoutes)] : []),
        ...(config.asyncRoutesFactory ? [provideAsyncRoutesFactory(config.asyncRoutesFactory)] : []),
        ...(config.asyncRoutesFactories ? provideAsyncRoutesFactories(config.asyncRoutesFactories) : []),
        ...(config.outletProviders ? [provideAdminifyProviders(config.outletProviders)] : []),
    ];
}

export function provideAdminifyProvider(provider: AdminifyOutletRouteProvider): Provider {
    return {provide: ADMINIFY_PROVIDER, multi: true, useValue: provider};
}

export function provideAdminifyProviders(providers: AdminifyOutletRouteProviders): Provider {
    return {provide: ADMINIFY_PROVIDER_ARRAY, multi: true, useValue: providers};
}

export function provideRoutes(routes: Routes): Provider {
    return {provide: ROUTES, multi: true, useValue: routes};
}

export function provideAsyncRoutes(routes: AsyncRoutes): Provider {
    return {provide: ASYNC_ROUTES, multi: true, useValue: routes};
}

export function provideAsyncRoutesByFactory(factory: AsyncRoutesFactory, deps?: any[]): Provider {
    return {provide: ASYNC_ROUTES, multi: true, useFactory: factory, deps: deps};
}

export function provideAsyncRoutesFactory(factory: AsyncRoutesFactoryDefinition): Provider {
    return {provide: ASYNC_ROUTES, multi: true, useFactory: factory.factory, deps: factory.deps};
}

export function provideAsyncRoutesFactories(factories: AsyncRoutesFactoryDefinition[]): Provider[] {
    const factoryProviders = factories.map(f => provideAsyncRoutesFactory(f));
    return factoryProviders;
}
