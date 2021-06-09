import {ActivatedRoute} from "@angular/router";
import {InjectionToken} from "@angular/core";

export const ADMINIFY_PROVIDER = new InjectionToken<AdminifyOutletRouteProvider>('ADMINIFY_PROVIDER');
export const ADMINIFY_PROVIDER_ARRAY = new InjectionToken<AdminifyOutletRouteProviders>('ADMINIFY_PROVIDER_ARRAY');

export type AdminifyOutletRouteProviders = AdminifyOutletRouteProvider[];
export type AdminifyOutletRouteProvider = TokenAdminifyOutletRouteProvider | FnAdminifyOutletRouteProvider;

interface BaseAdminifyOutletRouteProvider {
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean; // Todo: implement multi provider feature
    /**
     * A function to invoke to create a value for this `token`. The function is invoked with
     * resolved values of `token`s in the `deps` field.
     */
    useFactory: (route: ActivatedRoute, token: any, ...deps: any[]) => any;
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

/**
 * @deprecated The interface should not be used
 */
export interface FnAdminifyOutletRouteProvider extends BaseAdminifyOutletRouteProvider {
    /**
     * @deprecated The method should not be used
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provideFn?: (token: any) => boolean;
}
