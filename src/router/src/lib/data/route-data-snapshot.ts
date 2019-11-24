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

    constructor(property: string) {
        this.property = property;
    }
}

export class RoutePropertyToken {
    property: string;

    constructor(property: string) {
        this.property = property;
    }
}

export function RoutePropertySnapshot(property: string): RoutePropertySnapshotToken {
    return new RoutePropertySnapshotToken(property);
}

export function RouteProperty(property: string): RoutePropertyToken {
    return new RoutePropertyToken(property);
}
