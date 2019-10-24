import {Attribute, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {QueryParamsHandling, Router, UrlTree} from '@angular/router';
import {AdminPoolService} from '../services/admin-pool-service';
import {AdminRootRoute} from '../admin-root-route';

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

function attrBoolValue(s: any): boolean {
    return s === '' || !!s;
}
