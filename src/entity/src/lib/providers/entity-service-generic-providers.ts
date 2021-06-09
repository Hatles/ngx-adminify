import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {AdminPoolService, getFirstParentData} from '@ngx-adminify/core';
import {ActivatedRoute} from '@angular/router';
import {EntityAdmin} from '../entity-admin';
import {AdminifyEntityService, IAdminifyEntityService} from '../adminify-entity-service';

export const entityServiceToken = (entity: string) => {
    return new EntityServiceToken(entity);
};

export class EntityServiceToken {
    constructor(public entity: string) {}
}

// export const autoEntityServiceProvider: AdminifyOutletRouteProvider = {
//     provide: EntityServiceToken,
//     useFactory: (pool: AdminifyEntityPoolService) => {
//         return ;
//     },
//     deps: [AdminifyEntityPoolService]
// };

export const entityServiceProvider: AdminifyOutletRouteProvider = {
    provide: AdminifyEntityService,
    useFactory: entityServiceProviderFn,
    deps: [AdminPoolService]
};
export function entityServiceProviderFn(route: ActivatedRoute, token: any, pool: AdminPoolService) {
    return (pool.getAdmin(getFirstParentData(route, 'admin')) as EntityAdmin).entityService;
}

export const adminifyEntityGenericProviders: AdminifyOutletRouteProviders = [
    entityServiceProvider
];
