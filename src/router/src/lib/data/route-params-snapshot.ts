// tslint:disable-next-line:interface-over-type-literal
import {Observable} from 'rxjs';
import {Params} from '@angular/router';
import {RouteInjectionToken} from './route-data-snapshot';

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

export interface RouteParamsPropertySnapshotToken extends RouteInjectionToken {
    property: string;
}

export interface RouteParamsPropertyToken extends RouteInjectionToken {
    property: string;
}

export interface RouteParamSnapshotToken extends RouteInjectionToken {
    param: string;
}

export interface RouteParamToken extends RouteInjectionToken {
    param: string;
}

export function RouteParamSnapshot(property: string): RouteParamSnapshotToken {
    return {
        _type: 'RouteParamSnapshotToken',
        param: property
    };
}

export function RouteParam(param: string): RouteParamToken {
    return {
        _type: 'RouteParamToken',
        param: param
    };
}
