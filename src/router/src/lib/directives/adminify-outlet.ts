/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
    Attribute,
    ChangeDetectorRef,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    EventEmitter,
    Injector, OnDestroy, OnInit,
    Output,
    ViewContainerRef
} from '@angular/core';
import {AdminifyOutletRouteInjectorFactory} from '../services/adminify-outlet-route-injector-factory';
import {ActivatedRoute, ChildrenOutletContexts, Data, PRIMARY_OUTLET} from "@angular/router";

/**
 * @description
 *
 * Acts as a placeholder that Angular dynamically fills based on the current router state.
 *
 * Each outlet can have a unique name, determined by the optional `name` attribute.
 * The name cannot be set or changed dynamically. If not set, default value is "primary".
 *
 * ```
 * <router-outlet></router-outlet>
 * <router-outlet name='left'></router-outlet>
 * <router-outlet name='right'></router-outlet>
 * ```
 *
 * A router outlet emits an activate event when a new component is instantiated,
 * and a deactivate event when a component is destroyed.
 *
 * ```
 * <router-outlet
 *   (activate)='onActivate($event)'
 *   (deactivate)='onDeactivate($event)'></router-outlet>
 * ```
 * @ngModule RouterModule
 *
 * @publicApi
 */
// tslint:disable-next-line:directive-selector
@Directive({selector: 'admin-outlet', exportAs: 'outlet'})
// tslint:disable-next-line:directive-class-suffix
export class AdminifyOutlet implements OnDestroy, OnInit {
    private activated: ComponentRef<any>|null = null;
    private _activatedRoute: ActivatedRoute|null = null;
    private name: string;

    @Output('activate') activateEvents = new EventEmitter<any>();
    @Output('deactivate') deactivateEvents = new EventEmitter<any>();

    constructor(
        private routeInjectorFactory: AdminifyOutletRouteInjectorFactory,
        private parentContexts: ChildrenOutletContexts, private location: ViewContainerRef,
        private resolver: ComponentFactoryResolver, @Attribute('name') name: string,
        private changeDetector: ChangeDetectorRef) {
        this.name = name || PRIMARY_OUTLET;
        parentContexts.onChildOutletCreated(this.name, <any>this);
    }

    /** @nodoc */
    ngOnDestroy(): void {
        this.parentContexts.onChildOutletDestroyed(this.name);
    }

    /** @nodoc */
    ngOnInit(): void {
        if (!this.activated) {
            // If the outlet was not instantiated at the time the route got activated we need to populate
            // the outlet when it is initialized (ie inside a NgIf)
            const context = this.parentContexts.getContext(this.name);
            if (context && context.route) {
                if (context.attachRef) {
                    // `attachRef` is populated when there is an existing component to mount
                    this.attach(context.attachRef, context.route);
                } else {
                    // otherwise the component defined in the configuration is created
                    this.activateWith(context.route, context.resolver || null);
                }
            }
        }
    }

    get isActivated(): boolean {
        return !!this.activated;
    }

    /**
     * @returns The currently activated component instance.
     * @throws An error if the outlet is not activated.
     */
    get component(): Object {
        if (!this.activated) throw new Error('Outlet is not activated');
        return this.activated.instance;
    }

    get activatedRoute(): ActivatedRoute {
        if (!this.activated) throw new Error('Outlet is not activated');
        return this._activatedRoute as ActivatedRoute;
    }

    get activatedRouteData(): Data {
        if (this._activatedRoute) {
            return this._activatedRoute.snapshot.data;
        }
        return {};
    }

    /**
     * Called when the `RouteReuseStrategy` instructs to detach the subtree
     */
    detach(): ComponentRef<any> {
        if (!this.activated) throw new Error('Outlet is not activated');
        this.location.detach();
        const cmp = this.activated;
        this.activated = null;
        this._activatedRoute = null;
        return cmp;
    }

    /**
     * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
     */
    attach(ref: ComponentRef<any>, activatedRoute: ActivatedRoute) {
        this.activated = ref;
        this._activatedRoute = activatedRoute;
        this.location.insert(ref.hostView);
    }

    deactivate(): void {
        if (this.activated) {
            const c = this.component;
            this.activated.destroy();
            this.activated = null;
            this._activatedRoute = null;
            this.deactivateEvents.emit(c);
        }
    }

    activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver|null) {
        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }
        this._activatedRoute = activatedRoute;
        const snapshot = (<any>activatedRoute)._futureSnapshot;
        const component = <any>snapshot.routeConfig!.component;
        resolver = resolver || this.resolver;
        const factory = resolver.resolveComponentFactory(component);

        // !!!!!! changes from vanilla
        // const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
        const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
        const injector = this.routeInjectorFactory.get(activatedRoute, childContexts, this.location.injector);
        // const injector = new OutletInjector(activatedRoute, childContexts, this.location.injector);
        // !!!!

        this.activated = this.location.createComponent(factory, this.location.length, injector);
        // Calling `markForCheck` to make sure we will run the change detection when the
        // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
        this.changeDetector.markForCheck();
        this.activateEvents.emit(this.activated.instance);
    }
}
