import {AdminifyOutletRouteProvider, AdminOutletRouteProviders} from '@app/admin/router/adminify-outlet-route-provider';
import {Injectable, Injector} from '@angular/core';
import {ActivatedRoute, ChildrenOutletContexts} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AdminifyOutletRouteInjectorFactory {
    private providers: AdminOutletRouteProviders;

    constructor(providers: AdminOutletRouteProviders) {
        this.providers = providers ? providers : [];
    }

    // tslint:disable-next-line:max-line-length
    get(route: ActivatedRoute, childContexts: ChildrenOutletContexts, parent: Injector): AdminOutletInjector {
        return new AdminOutletInjector(route, childContexts, parent, this);
    }

    getProvider(token: any): AdminifyOutletRouteProvider {
        return this.providers.find(p => p.provide === token);
    }
}



class AdminOutletInjector implements Injector {
    constructor(
        private route: ActivatedRoute,
        private childContexts: ChildrenOutletContexts,
        private parent: Injector,
        private factory: AdminifyOutletRouteInjectorFactory) {}

    get(token: any, notFoundValue?: any): any {
        if (token === ActivatedRoute) {
            return this.route;
        }

        if (token === ChildrenOutletContexts) {
            return this.childContexts;
        }

        const provider = this.factory.getProvider(token);
        if (provider) {
            return provider.factory.apply(this, [this.route.snapshot, ...provider.deps]);
        }

        return this.parent.get(token, notFoundValue);
    }
}
