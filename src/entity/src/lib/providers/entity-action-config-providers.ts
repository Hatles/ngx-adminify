import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {AdminPoolService, getFisrtParentData} from '@ngx-adminify/core';
import {ActivatedRoute} from '@angular/router';
import {EntityAdmin} from '../entity-admin';
import {EntityListConfigsToken} from '../actions/entity-list-config';
import {AdminDataProperty} from '../../../../core/src/lib/data/admin-data';

export const entityListConfigProvider: AdminifyOutletRouteProvider = {
    provide: EntityListConfigsToken,
    factory: (route: ActivatedRoute, token: any, list: any) => {
        return list;
    },
    deps: [AdminDataProperty('list')]
};

export const adminifyEntityActionProviders: AdminifyOutletRouteProviders = [
    entityListConfigProvider
];
