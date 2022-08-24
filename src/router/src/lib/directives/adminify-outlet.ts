/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
    ComponentFactoryResolver,
    Directive,
    EnvironmentInjector,
    inject, isDevMode,
    ɵRuntimeError as RuntimeError
} from '@angular/core';
import {AdminifyOutletRouteInjectorFactory} from '../services/adminify-outlet-route-injector-factory';
import { ActivatedRoute, RouterOutlet } from "@angular/router";

// tslint:disable-next-line:directive-selector
@Directive({selector: 'admin-outlet', exportAs: 'outlet'})
// tslint:disable-next-line:directive-class-suffix
export class AdminifyOutlet extends RouterOutlet {

    private routeInjectorFactory: AdminifyOutletRouteInjectorFactory = inject(AdminifyOutletRouteInjectorFactory);

    activateWith(
        activatedRoute: ActivatedRoute,
        resolverOrInjector?: ComponentFactoryResolver|EnvironmentInjector|null) {
        if (this.isActivated) {
            throw new RuntimeError(
                4013,
                isDevMode() && 'Cannot activate an already activated outlet');
        }

        // TRICK INTERNAL API
        const me = this as any;

        me._activatedRoute = activatedRoute;
        const location = me.location;
        const snapshot = (activatedRoute as any)._futureSnapshot;
        const component = snapshot.component!;
        const childContexts = me.parentContexts.getOrCreateContext(me.name).children;
        const injector = this.routeInjectorFactory.get(activatedRoute, childContexts, location.injector);

        if (resolverOrInjector && isComponentFactoryResolver(resolverOrInjector)) {
            const factory = resolverOrInjector.resolveComponentFactory(component);
            me.activated = location.createComponent(factory, location.length, injector);
        } else {
            const environmentInjector = resolverOrInjector ?? me.environmentInjector;
            me.activated = location.createComponent(
                component, {index: location.length, injector, environmentInjector});
        }
        // Calling `markForCheck` to make sure we will run the change detection when the
        // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
        me.changeDetector.markForCheck();
        me.activateEvents.emit(me.activated.instance);
    }
}

function isComponentFactoryResolver(item: any): item is ComponentFactoryResolver {
    return !!item.resolveComponentFactory;
}
