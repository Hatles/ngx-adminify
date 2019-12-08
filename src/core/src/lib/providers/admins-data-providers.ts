import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {AdminsData, AdminsDataPropertyToken, TypedAdminsData} from '../data/admins-data';
import {ActivatedRoute} from '@angular/router';
import {AdminPoolService} from '../services/admin-pool-service';

export const adminsDataProvider: AdminifyOutletRouteProvider = {
    provide: AdminsData,
    factory: (route: ActivatedRoute, token: any, pool: AdminPoolService): AdminsData => ({ data: pool.getData() }),
    deps: [AdminPoolService]
};

export const typedAdminsDataProvider: AdminifyOutletRouteProvider = {
    provide: TypedAdminsData,
    factory: (route: ActivatedRoute, token: any, pool: AdminPoolService): TypedAdminsData<any> => ({ data: pool.getData() }),
    deps: [AdminPoolService]
};

export const adminsDataPropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof AdminsDataPropertyToken,
    factory: (route: ActivatedRoute, token: AdminsDataPropertyToken, pool: AdminPoolService): any => pool.getData(token.property, token.defaultValue),
    deps: [AdminPoolService]
};

export const adminsDataProviders: AdminifyOutletRouteProviders = [
    adminsDataProvider,
    typedAdminsDataProvider,
    adminsDataPropertyProvider
];
