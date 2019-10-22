import {Attribute, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {ActivatedRoute, QueryParamsHandling, Router, UrlTree} from '@angular/router';
import {Admin} from '@app/admin/core/admin';
import {RouteParametersValues} from '@app/admin/core/admin-route-builder';


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
    private preserve: boolean;

    constructor(
        private router: Router, private route: ActivatedRoute, private admin: Admin,
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

            this.commands = this.admin.getActionUrl(adminActionName, parameters);
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
