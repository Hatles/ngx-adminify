/**
 * Describes how the `Injector` should be configured.
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @see `StaticProvider`
 *
 * @publicApi
 */
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

export type AdminOutletRouteProviders = AdminOutletRouteProvider[];

export interface AdminOutletRouteProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provide: any;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
    /**
     * A function to invoke to create a value for this `token`. The function is invoked with
     * resolved values of `token`s in the `deps` field.
     */
    factory: (route: ActivatedRouteSnapshot, ...deps: []) => any;
    /**
     * A list of `token`s to be resolved by the injector. The list of values is then
     * used as arguments to the `useFactory` function.
     */
    deps?: any[];
}
