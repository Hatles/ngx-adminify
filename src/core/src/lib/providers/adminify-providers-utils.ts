import {ActivatedRoute} from '@angular/router';

export function getFirstParent(route: ActivatedRoute, conditionFn: (route: ActivatedRoute) => boolean): ActivatedRoute {
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
    return getFirstParent(route, (r => r.snapshot.data.hasOwnProperty(dataName)));
}

export function getFirstParentWithDataEquals(route: ActivatedRoute, dataName: string, dataValue: any): any {
    return getFirstParent(route, (r => r.snapshot.data[dataName] === dataValue));
}

export function getFirstParentData(route: ActivatedRoute, dataName: string): any {
    return getFisrtParentWithData(route, dataName).snapshot.data[dataName];
}
