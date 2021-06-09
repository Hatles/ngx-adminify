import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {ActivatedRoute} from '@angular/router';
import {EntityListConfigsToken} from '../actions/entity-list-config';
import {EntityViewConfigsToken} from '../actions/entity-view-config';
import {EntityCreateConfigsToken, EntityEditConfigsToken, EntityEditModeToken} from '../actions/entiy-edit-config';
import {ActionDataPropertyTokenType} from '@ngx-adminify/core';

function jsonCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export const entityListConfigProvider: AdminifyOutletRouteProvider = {
    provide: EntityListConfigsToken,
    useFactory: entityListConfigProviderFn,
    deps: [{property: 'entityList', defaultValue: null, tokenType: ActionDataPropertyTokenType}]
};
export function entityListConfigProviderFn(route: ActivatedRoute, token: any, list: any) {
    return jsonCopy(list);
}

export const entityViewConfigProvider: AdminifyOutletRouteProvider = {
    provide: EntityViewConfigsToken,
    useFactory: entityViewConfigProviderFn,
    deps: [{property: 'entityView', defaultValue: null, tokenType: ActionDataPropertyTokenType}]
};
export function entityViewConfigProviderFn(route: ActivatedRoute, token: any, view: any) {
    return jsonCopy(view);
}

export const entityEditModeProvider: AdminifyOutletRouteProvider = {
    provide: EntityEditModeToken,
    useFactory: entityEditModeProviderFn,
    deps: [{property: 'entityEditMode', defaultValue: null, tokenType: ActionDataPropertyTokenType}]
};
export function entityEditModeProviderFn(route: ActivatedRoute, token: any, edit: any) {
    return edit === 'create' ? 'create' : 'edit';
}

export const entityEditConfigProvider: AdminifyOutletRouteProvider = {
    provide: EntityEditConfigsToken,
    useFactory: entityEditConfigProviderFn,
    deps: [{property: 'entityEdit', defaultValue: null, tokenType: ActionDataPropertyTokenType}]
};
export function entityEditConfigProviderFn(route: ActivatedRoute, token: any, edit: any) {
    return jsonCopy(edit);
}

export const entityCreateConfigProvider: AdminifyOutletRouteProvider = {
    provide: EntityCreateConfigsToken,
    useFactory: entityCreateConfigProviderFn,
    deps: [{property: 'entityCreate', defaultValue: null, tokenType: ActionDataPropertyTokenType}]
};
export function entityCreateConfigProviderFn(route: ActivatedRoute, token: any, create: any) {
    return jsonCopy(create);
}

export const adminifyEntityActionProviders: AdminifyOutletRouteProviders = [
    entityListConfigProvider,
    entityViewConfigProvider,
    entityEditModeProvider,
    entityEditConfigProvider,
    entityCreateConfigProvider
];
