/**
 * Describes how the `Injector` should be configured.
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @see `StaticProvider`
 *
 * @publicApi
 */
import {ActivatedRoute} from './angular/router';
import {InjectionToken} from '@angular/core';

export const ADMINIFY_PROVIDER = new InjectionToken<AdminifyOutletRouteProvider>('ADMINIFY_PROVIDER');

export type AdminifyOutletRouteProviders = AdminifyOutletRouteProvider[];

export type AdminifyOutletRouteProvider = TokenAdminifyOutletRouteProvider | FnAdminifyOutletRouteProvider;

export interface BaseAdminifyOutletRouteProvider {
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean; // Todo: implement multi provider feature
    /**
     * A function to invoke to create a value for this `token`. The function is invoked with
     * resolved values of `token`s in the `deps` field.
     */
    factory: (route: ActivatedRoute, token: any, ...deps: any[]) => any;
    /**
     * A list of `token`s to be resolved by the injector. The list of values is then
     * used as arguments to the `useFactory` function.
     */
    deps?: any[];
}

export interface TokenAdminifyOutletRouteProvider extends BaseAdminifyOutletRouteProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provide?: any;
}

export interface FnAdminifyOutletRouteProvider extends BaseAdminifyOutletRouteProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provideFn?: (token: any) => boolean;
}
