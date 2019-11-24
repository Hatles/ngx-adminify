// tslint:disable-next-line:interface-over-type-literal
import {Observable} from 'rxjs';
import {Params} from '@angular/router';

export class RouteParamsSnapshot {
    params: Params;
}

export class RouteParams {
    params: Observable<Params>;
}

export class TypedRouteParamsSnapshot<TParams extends Params> {
    params: TParams;
}

export class TypedRouteParams<TParams extends Params> {
    params: Observable<TParams>;
}

export class RouteParamsPropertySnapshot<T> {
    params: T;
}

export class RouteParamsProperty<T> {
    params: Observable<T>;
}

export class RouteParamsPropertySnapshotToken {
    property: string;
}

export class RouteParamsPropertyToken {
    property: string;
}

export class RouteParamSnapshotToken {
    param: string;

    constructor(param: string) {
        this.param = param;
    }
}

export class RouteParamToken {
    param: string;

    constructor(param: string) {
        this.param = param;
    }
}

export function RouteParamSnapshot(property: string): RouteParamSnapshotToken {
    return new RouteParamSnapshotToken(property);
}

export function RouteParam(param: string): RouteParamToken {
    return new RouteParamToken(param);
}
