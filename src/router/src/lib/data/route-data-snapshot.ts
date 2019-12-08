// tslint:disable-next-line:interface-over-type-literal
import {Observable} from 'rxjs';
import {Data} from '@angular/router';

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

export class RouteDataPropertySnapshotToken {
    property: string;
}

export class RouteDataPropertyToken {
    property: string;
}

export class RoutePropertySnapshotToken {
    property: string;
    defaultValue: any;

    constructor(property: string, defaultValue?: any) {
        this.property = property;
        this.defaultValue = defaultValue;
    }
}

export class RoutePropertyToken {
    property: string;
    defaultValue: any;

    constructor(property: string, defaultValue?: any) {
        this.property = property;
        this.defaultValue = defaultValue;
    }
}

export function RoutePropertySnapshot(property: string, defaultValue?: any): RoutePropertySnapshotToken {
    return new RoutePropertySnapshotToken(property, defaultValue);
}

export function RouteProperty(property: string, defaultValue?: any): RoutePropertyToken {
    return new RoutePropertyToken(property, defaultValue);
}
