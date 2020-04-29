// tslint:disable-next-line:interface-over-type-literal
import {Observable} from 'rxjs';
import {Data} from '@angular/router';
import {InjectionToken} from "@angular/core";

export interface RouteInjectionToken {
    _type: any;
}

export class RouteDataSnapshot {
    data: Data;
}

export class RouteData {
    data: Observable<Data>;
}

export class TypedRouteDataSnapshot<TData extends Data> {
    data: TData;
}

export class TypedRouteData<TData extends Data> {
    data: Observable<TData>;
}

export class RouteDataPropertySnapshot<T> {
    data: T;
}

export class RouteDataProperty<T> {
    data: Observable<T>;
}

export interface RouteDataPropertySnapshotToken extends RouteInjectionToken {
    property: string;
}

export interface RouteDataPropertyToken extends RouteInjectionToken {
    property: string;
}

export interface RoutePropertySnapshotToken extends RouteInjectionToken {
    property: string;
    defaultValue: any;
}

export interface RoutePropertyToken extends RouteInjectionToken {
    property: string;
    defaultValue: any;
}

// export function RoutePropertySnapshot(property: string, defaultValue?: any): RoutePropertySnapshotToken {
//     const token = new RoutePropertySnapshotToken(property, defaultValue);
//     return token;
// }
export function RoutePropertySnapshot(property: string, defaultValue?: any): RoutePropertySnapshotToken {
    return Object.assign(new InjectionToken('RoutePropertySnapshotToken'), {
        _type: 'RoutePropertySnapshotToken',
        property: property,
        defaultValue: defaultValue
    });
    // return {
    //     _type: 'RoutePropertySnapshotToken',
    //     property: property,
    //     defaultValue: defaultValue
    // };
}

export function RouteProperty(property: string, defaultValue?: any): RoutePropertyToken {
    return {
        _type: 'RoutePropertyToken',
        property: property,
        defaultValue: defaultValue
    };
}
