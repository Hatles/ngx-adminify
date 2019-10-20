import {Route} from '@angular/router';
import {removePostFix} from './remove-post-fix';
import {removePreFix} from './remove-pre-fix';
export interface RouteWithAbsoluteUrl {
    route: Route;
    url: string;
}

export interface RouteWithParent {
    route: Route;
    parent: RouteWithParent;
}

export function routeWithParentToUrl(routeWithParent: RouteWithParent): RouteWithAbsoluteUrl {
    let url = '';
    let currentRoute = routeWithParent;
    while (currentRoute.parent) {
        url = removePostFix(currentRoute.route.path, '/') + '/' + removePreFix(url, '/');
        currentRoute = currentRoute.parent;
    }
    url = '/' + url;

    return {
        route: routeWithParent.route,
        url: url
    };
}
