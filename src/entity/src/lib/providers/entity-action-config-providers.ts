import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {ActivatedRoute} from '@angular/router';
import {EntityListConfigsToken} from '../actions/entity-list-config';
import {ActionDataProperty} from '@ngx-adminify/core';
import {EntityViewConfigsToken} from '../actions/entity-view-config';
import {EntityCreateConfigsToken, EntityEditConfigsToken, EntityEditMode, EntityEditModeToken} from '../actions/entiy-edit-config';

export const entityListConfigProvider: AdminifyOutletRouteProvider = {
    provide: EntityListConfigsToken,
    factory: (route: ActivatedRoute, token: any, list: any) => {
        return list;
    },
    deps: [ActionDataProperty('entityList')]
};

export const entityViewConfigProvider: AdminifyOutletRouteProvider = {
    provide: EntityViewConfigsToken,
    factory: (route: ActivatedRoute, token: any, view: any) => {
        return view;
    },
    deps: [ActionDataProperty('entityView')]
};

export const entityEditModeProvider: AdminifyOutletRouteProvider = {
    provide: EntityEditModeToken,
    factory: (route: ActivatedRoute, token: any, edit: any): EntityEditMode => {
        return edit === 'create' ? 'create' : 'edit';
    },
    deps: [ActionDataProperty('entityEditMode')]
};

export const entityEditConfigProvider: AdminifyOutletRouteProvider = {
    provide: EntityEditConfigsToken,
    factory: (route: ActivatedRoute, token: any, edit: any) => {
        return edit;
    },
    deps: [ActionDataProperty('entityEdit')]
};

export const entityCreateConfigProvider: AdminifyOutletRouteProvider = {
    provide: EntityCreateConfigsToken,
    factory: (route: ActivatedRoute, token: any, create: any) => {
        return create;
    },
    deps: [ActionDataProperty('entityCreate')]
};

export const adminifyEntityActionProviders: AdminifyOutletRouteProviders = [
    entityListConfigProvider,
    entityViewConfigProvider,
    entityEditModeProvider,
    entityEditConfigProvider,
    entityCreateConfigProvider
];
