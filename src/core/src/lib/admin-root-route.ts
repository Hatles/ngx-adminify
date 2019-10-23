import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router/router_state';
import {Observable} from 'rxjs';
import {UrlSegment} from '@angular/router/url_tree';
import {Params} from '@angular/router/shared';
import {Data} from '@angular/router/config';
import {Type} from '@angular/core';

export class AdminRootRoute extends ActivatedRoute {
    constructor(
        /** An observable of the URL segments matched by this route. */
        url: Observable<UrlSegment[]>,
        /** An observable of the matrix parameters scoped to this route. */
        params: Observable<Params>,
        /** An observable of the query parameters shared by all the routes. */
        queryParams: Observable<Params>,
        /** An observable of the URL fragment shared by all the routes. */
        fragment: Observable<string>,
        /** An observable of the static and resolved data of this route. */
        data: Observable<Data>,
        /** The outlet name of the route, a constant. */
        outlet: string,
        /** The component of the route, a constant. */
        // TODO(vsavkin): remove |string
        component: Type<any>|string|null, futureSnapshot: ActivatedRouteSnapshot) {
        super(url, params, queryParams, fragment, data, outlet, component, futureSnapshot);
    }
}
