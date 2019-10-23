import {ActivatedRoute} from '@angular/router/router_state';

export function getFisrtParent(route: ActivatedRoute, conditionFn: (route: ActivatedRoute) => boolean): ActivatedRoute {
    if (conditionFn(route)) {
        return route;
    }

    while (route.parent) {
        route = route.parent;

        if (conditionFn(route)) {
            return route;
        }
    }
}

export function getFisrtParentWithData(route: ActivatedRoute, dataName: string): ActivatedRoute {
    return getFisrtParent(route, (r => r.snapshot.data.hasOwnProperty(dataName)));
}

export function getFisrtParentWithDataEquals(route: ActivatedRoute, dataName: string, dataValue: any): any {
    return getFisrtParent(route, (r => r.snapshot.data[dataName] === dataValue));
}

export function getFisrtParentData(route: ActivatedRoute, dataName: string): any {
    return getFisrtParentWithData(route, dataName).snapshot.data[dataName];
}
