import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {ActivatedRoute} from '@angular/router';
import {EntityListConfigsToken} from '../actions/entity-list-config';
import {ActionDataProperty} from '@ngx-adminify/core';
import {EntityViewConfigsToken} from '../actions/entity-view-config';

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

export const adminifyEntityActionProviders: AdminifyOutletRouteProviders = [
    entityListConfigProvider,
    entityViewConfigProvider
];
