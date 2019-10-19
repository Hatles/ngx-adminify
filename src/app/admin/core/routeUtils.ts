import {Route} from '@angular/router';
import {removePostFix} from './removePostFix';
import {removePreFix} from './removePreFix';
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
