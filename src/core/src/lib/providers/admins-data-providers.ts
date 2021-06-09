import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {AdminsData, AdminsDataPropertyToken, TypedAdminsData} from '../data/admins-data';
import {ActivatedRoute} from '@angular/router';
import {AdminPoolService} from '../services/admin-pool-service';

export const adminsDataProvider: AdminifyOutletRouteProvider = {
    provide: AdminsData,
    useFactory: adminsDataProviderFn,
    deps: [AdminPoolService]
};
export function adminsDataProviderFn(route: ActivatedRoute, token: any, pool: AdminPoolService): AdminsData {
    return { data: pool.getData() };
}

export const typedAdminsDataProvider: AdminifyOutletRouteProvider = {
    provide: TypedAdminsData,
    useFactory: typedAdminsDataProviderFn,
    deps: [AdminPoolService]
};
export function typedAdminsDataProviderFn(route: ActivatedRoute, token: any, pool: AdminPoolService): TypedAdminsData<any> {
    return { data: pool.getData() };
}

export const adminsDataPropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: adminsDataPropertyProviderProvideFn,
    useFactory: adminsDataPropertyProviderFn,
    deps: [AdminPoolService]
};
export function adminsDataPropertyProviderProvideFn(token: any) {
    return token instanceof AdminsDataPropertyToken;
}
export function adminsDataPropertyProviderFn(route: ActivatedRoute, token: AdminsDataPropertyToken, pool: AdminPoolService): any {
    return pool.getData(token.property, token.defaultValue);
}

export const adminsDataProviders: AdminifyOutletRouteProviders = [
    adminsDataProvider,
    typedAdminsDataProvider,
    adminsDataPropertyProvider
];
