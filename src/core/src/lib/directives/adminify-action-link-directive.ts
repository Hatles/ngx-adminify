import {
    Attribute,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input, isDevMode,
    OnChanges,
    OnDestroy,
    Renderer2
} from '@angular/core';
import {NavigationEnd, QueryParamsHandling, Router, UrlTree} from '@angular/router';
import {Admin} from '../admin';
import {RouteParametersValues} from '../services/admin-route-builder';
import {AdminActivatedRoute} from '../admin-activated-route';
import {Subscription} from 'rxjs';
import {LocationStrategy} from '@angular/common';

// tslint:disable-next-line:directive-selector
@Directive({selector: ':not(a):not(area)[adminifyActionLink]'})
export class AdminifyActionLinkDirective {
    @Input() queryParams: {[k: string]: any};
    @Input() fragment: string;
    @Input() queryParamsHandling: QueryParamsHandling;
    @Input() preserveFragment: boolean;
    @Input() skipLocationChange: boolean;
    @Input() replaceUrl: boolean;
    @Input() state?: {[k: string]: any};
    private commands: any[] = [];

    constructor(
        private router: Router, private route: AdminActivatedRoute, private admin: Admin,
        @Attribute('tabindex') tabIndex: string, renderer: Renderer2, el: ElementRef) {
        if (tabIndex == null) {
            renderer.setAttribute(el.nativeElement, 'tabindex', '0');
        }
    }

    @Input()
    set adminifyActionLink(action: string | { action: string, parameters?: RouteParametersValues | string[] } | string[]) {
        if (action) {
            let adminActionName: string;
            let parameters: RouteParametersValues | string[];
            if (typeof action === 'string') {
                adminActionName = action;
                parameters = {};
            } else if (Array.isArray(action)) {
                adminActionName = action[0];
                parameters = action.slice(1);
            } else if (typeof action === 'object') {
                adminActionName = action.action;
                parameters = action.parameters || {};
            }

            this.commands = this.admin.getActionTrueUrl(adminActionName, parameters);
        } else {
            this.commands = [];
        }
    }

    @HostListener('click')
    onClick(): boolean {
        const extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return true;
    }

    get urlTree(): UrlTree {
        return this.router.createUrlTree(this.commands, {
            relativeTo: this.route as any,
            queryParams: this.queryParams,
            fragment: this.fragment,
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: attrBoolValue(this.preserveFragment),
        });
    }
}

/**
 * @description
 *
 * Lets you link to specific routes in your app.
 *
 * See `RouterLink` for more information.
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
@Directive({selector: 'a[adminifyActionLink],area[adminifyActionLink]'})
export class AdminifyActionLinkWithHrefDirective implements OnChanges, OnDestroy {
    @HostBinding('attr.target') @Input() target: string;
    @Input() queryParams: {[k: string]: any};
    @Input() fragment: string;
    @Input() queryParamsHandling: QueryParamsHandling;
    @Input() preserveFragment: boolean;
    @Input() skipLocationChange: boolean;
    @Input() replaceUrl: boolean;
    @Input() state?: {[k: string]: any};
    private commands: any[] = [];
    private subscription: Subscription;

    // the url displayed on the anchor element.
    @HostBinding() href: string;

    constructor(
        private router: Router, private route: AdminActivatedRoute, private admin: Admin,
        private locationStrategy: LocationStrategy) {
        this.subscription = router.events.subscribe((s) => {
            if (s instanceof NavigationEnd) {
                this.updateTargetUrlAndHref();
            }
        });
    }

    @Input()
    set adminifyActionLink(action: string | { action: string, parameters?: RouteParametersValues | string[] } | any[]) {
        if (action) {
            let adminActionName: string;
            let parameters: RouteParametersValues | string[];
            if (typeof action === 'string') {
                adminActionName = action;
                parameters = {};
            } else if (Array.isArray(action)) {
                adminActionName = action[0];
                parameters = action.slice(1);
            } else if (typeof action === 'object') {
                adminActionName = action.action;
                parameters = action.parameters || {};
            }

            this.commands = this.admin.getActionTrueUrl(adminActionName, parameters);
        } else {
            this.commands = [];
        }
    }

    ngOnChanges(changes: {}): any { this.updateTargetUrlAndHref(); }
    ngOnDestroy(): any { this.subscription.unsubscribe(); }

    @HostListener('click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'])
    onClick(button: number, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean): boolean {
        if (button !== 0 || ctrlKey || metaKey || shiftKey) {
            return true;
        }

        if (typeof this.target === 'string' && this.target !== '_self') {
            return true;
        }

        const extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
            state: this.state
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return false;
    }

    private updateTargetUrlAndHref(): void {
        this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
    }

    get urlTree(): UrlTree {
        return this.router.createUrlTree(this.commands, {
            relativeTo: this.route as any,
            queryParams: this.queryParams,
            fragment: this.fragment,
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: attrBoolValue(this.preserveFragment),
        });
    }
}

function attrBoolValue(s: any): boolean {
    return s === '' || !!s;
}
