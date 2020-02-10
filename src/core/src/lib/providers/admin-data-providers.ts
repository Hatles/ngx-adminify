import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {AdminData, AdminDataPropertyToken, TypedAdminData} from '../data/admin-data';
import {ActivatedRoute} from '@angular/router';
import {Admin} from '../admin';

export const adminDataProvider: AdminifyOutletRouteProvider = {
    provide: AdminData,
    factory: adminDataProviderFn,
    deps: [Admin]
};
export function adminDataProviderFn(route: ActivatedRoute, token: any, admin: Admin): AdminData {
    return { data: admin.getData() };
}

export const typedAdminDataProvider: AdminifyOutletRouteProvider = {
    provide: TypedAdminData,
    factory: typedAdminDataProviderFn,
    deps: [Admin]
};
export function typedAdminDataProviderFn(route: ActivatedRoute, token: any, admin: Admin): TypedAdminData<any> {
    return { data: admin.getData() };
}

export const adminDataPropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: adminDataPropertyProviderProvideFn,
    factory: adminDataPropertyProviderFn,
    deps: [Admin]
};
export function adminDataPropertyProviderProvideFn(token: any) {
    return token instanceof AdminDataPropertyToken;
}
export function adminDataPropertyProviderFn(route: ActivatedRoute, token: AdminDataPropertyToken, admin: Admin) {
    return admin.getData(token.property, token.defaultValue);
}

export const adminDataProviders: AdminifyOutletRouteProviders = [
    adminDataProvider,
    typedAdminDataProvider,
    adminDataPropertyProvider
];
