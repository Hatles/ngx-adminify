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
import {AdminPoolService} from '../services/admin-pool-service';
import {AdminRootRoute} from '../admin-root-route';
import {Subscription} from 'rxjs';
import {LocationStrategy} from '@angular/common';

// tslint:disable-next-line:directive-selector
@Directive({selector: ':not(a):not(area)[adminifyLink]'})
export class AdminifyLinkDirective {
    @Input() queryParams: {[k: string]: any};
    @Input() fragment: string;
    @Input() queryParamsHandling: QueryParamsHandling;
    @Input() preserveFragment: boolean;
    @Input() skipLocationChange: boolean;
    @Input() replaceUrl: boolean;
    @Input() state?: {[k: string]: any};
    private commands: any[] = [];
    private preserve: boolean;

    constructor(
        private router: Router, private route: AdminRootRoute, private pool: AdminPoolService,
        @Attribute('tabindex') tabIndex: string, renderer: Renderer2, el: ElementRef) {
        if (tabIndex == null) {
            renderer.setAttribute(el.nativeElement, 'tabindex', '0');
        }
    }

    @Input()
    set adminifyLink(admin: string) {
        if (admin) {
            this.commands = this.pool.getAdmin(admin).getUrl();
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
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            preserveQueryParams: attrBoolValue(this.preserve),
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
@Directive({selector: 'a[adminifyLink],area[adminifyLink]'})
export class AdminifyLinkWithHrefDirective implements OnChanges, OnDestroy {
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
    private preserve: boolean;

    // the url displayed on the anchor element.
    @HostBinding() href: string;

    constructor(
        private router: Router, private route: AdminRootRoute, private pool: AdminPoolService,
        private locationStrategy: LocationStrategy) {
        this.subscription = router.events.subscribe((s) => {
            if (s instanceof NavigationEnd) {
                this.updateTargetUrlAndHref();
            }
        });
    }

    @Input()
    set adminifyLink(admin: string) {
        if (admin) {
            this.commands = this.pool.getAdmin(admin).getUrl();
        } else {
            this.commands = [];
        }
    }

    @Input()
    set preserveQueryParams(value: boolean) {
        if (isDevMode() && console as any && console.warn) {
            console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
        }
        this.preserve = value;
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
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            preserveQueryParams: attrBoolValue(this.preserve),
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: attrBoolValue(this.preserveFragment),
        });
    }
}

function attrBoolValue(s: any): boolean {
    return s === '' || !!s;
}
