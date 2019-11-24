import {Injectable, Injector} from '@angular/core';
import {ActivatedRoute, ChildrenOutletContexts} from '../angular/router';
import {ActivatedRoute as AActivatedRoute} from '@angular/router';
import {
    AdminifyOutletRouteProvider,
    AdminifyOutletRouteProviders,
    FnAdminifyOutletRouteProvider,
    TokenAdminifyOutletRouteProvider
} from '../adminify-outlet-route-provider';

@Injectable({providedIn: 'root'})
export class AdminifyOutletRouteInjectorFactory {
    private providers: AdminifyOutletRouteProviders;

    constructor(providers: AdminifyOutletRouteProviders) {
        this.providers = providers ? providers : [];
    }

    // tslint:disable-next-line:max-line-length
    get(route: ActivatedRoute, childContexts: ChildrenOutletContexts, parent: Injector): AdminOutletInjector {
        return new AdminOutletInjector(route, childContexts, parent, this);
    }

    getProvider(token: any): AdminifyOutletRouteProvider {
        return this.providers.find(p => {
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

class AdminOutletInjector implements Injector {
    constructor(
        private route: ActivatedRoute,
        private childContexts: ChildrenOutletContexts,
        private parent: Injector,
        private factory: AdminifyOutletRouteInjectorFactory) {}

    get(token: any, notFoundValue?: any): any {
        if (token === ActivatedRoute || token === AActivatedRoute) {
            return this.route;
        }

        if (token === ChildrenOutletContexts) {
            return this.childContexts;
        }

        const provider = this.factory.getProvider(token);
        if (provider) {
            return provider.factory.apply(undefined, [this.route, token, ...(provider.deps || []).map(dep => this.get(dep))]);
        }

        return this.parent.get(token, notFoundValue);
    }
}
