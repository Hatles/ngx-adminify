import {Inject, Injectable, InjectionToken, Injector, Optional, SkipSelf} from '@angular/core';
import {ActivatedRoute, ChildrenOutletContexts} from '@angular/router';
import {
    ADMINIFY_PROVIDER, ADMINIFY_PROVIDER_ARRAY,
    AdminifyOutletRouteProvider,
    AdminifyOutletRouteProviders,
    FnAdminifyOutletRouteProvider,
    TokenAdminifyOutletRouteProvider
} from '../providers/providers';

@Injectable()
export class AdminifyOutletRouteInjectorFactory {
    private providers: AdminifyOutletRouteProviders;

    constructor(
        @Optional() @SkipSelf() private parentOutletInjector: AdminifyOutletRouteInjectorFactory,
        @Optional() @Inject(ADMINIFY_PROVIDER) providers: AdminifyOutletRouteProviders = [],
        @Optional() @Inject(ADMINIFY_PROVIDER_ARRAY) providersArr: AdminifyOutletRouteProviders[] = []
    ) {
        this.providers = [];

        if (providers && providers.length) {
            this.addProviders(providers);
        }
        if (providersArr && providersArr) {
            providersArr.forEach(ps => this.addProviders(ps))
        }
    }

    // tslint:disable-next-line:max-line-length
    get(route: ActivatedRoute, childContexts: ChildrenOutletContexts, parent: Injector): Injector {
        return new AdminifyOutletInjector(route, childContexts, parent, this);
    }

    getProvider(token: any): AdminifyOutletRouteProvider {
        const provider = this.providers.find(p => {
            const providerFn = p as FnAdminifyOutletRouteProvider;
            if (providerFn.provideFn) {
                return providerFn.provideFn(token);
            }
            const providerToken = p as TokenAdminifyOutletRouteProvider;
            if (providerToken.provide) {
                return providerToken.provide === token;
            }
            throw new Error('Provider must have at least a provide or a provideFn property');
        });

        if (provider) {
            return provider;
        }

        if (this.parentOutletInjector) {
            this.parentOutletInjector.getProvider(token);
        }

        return null;
    }

    addProvider(provider: AdminifyOutletRouteProvider) {
        // Todo: implement check for unique provider and multi for multi
        // if (this.getProvider(provider.provide)) {
        //     throw new Error('Provider for token 'provider.provide.toString())
        // }

        // check if provider was already added
        // tslint:disable-next-line:no-string-literal
        if (!provider['_added'] === true) {
            this.providers.push(provider);
            // tslint:disable-next-line
            provider['_added'] = true;
        }
    }

    addProviders(providers: AdminifyOutletRouteProviders) {
        providers.forEach(provider => this.addProvider(provider));
    }
}

class AdminifyOutletInjector implements Injector {
    constructor(
        private route: ActivatedRoute,
        private childContexts: ChildrenOutletContexts,
        private parent: Injector,
        private factory: AdminifyOutletRouteInjectorFactory) {}

    get(token: any, notFoundValue?: any): any {
        if (token === ActivatedRoute || token === ActivatedRoute) {
            return this.route;
        }

        if (token === ChildrenOutletContexts) {
            return this.childContexts;
        }

        if (token === Injector) {
            return this;
        }

        const provider = this.factory.getProvider(token);
        if (provider) {
            return provider.useFactory.apply(undefined, [this.route, token, ...(provider.deps || []).map(dep => this.get(dep))]);
        }

        return this.parent.get(token, notFoundValue);
    }
}
