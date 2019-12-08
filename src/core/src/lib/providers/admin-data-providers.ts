import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {AdminData, AdminDataPropertyToken, TypedAdminData} from '../data/admin-data';
import {ActivatedRoute} from '@angular/router';
import {Admin} from '../admin';

export const adminDataProvider: AdminifyOutletRouteProvider = {
    provide: AdminData,
    factory: (route: ActivatedRoute, token: any, admin: Admin): AdminData => ({ data: admin.getData() }),
    deps: [Admin]
};

export const typedAdminDataProvider: AdminifyOutletRouteProvider = {
    provide: TypedAdminData,
    factory: (route: ActivatedRoute, token: any, admin: Admin): TypedAdminData<any> => ({ data: admin.getData() }),
    deps: [Admin]
};

export const adminDataPropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof AdminDataPropertyToken,
    factory: (route: ActivatedRoute, token: AdminDataPropertyToken, admin: Admin): any => admin.getData(token.property, token.defaultValue),
    deps: [Admin]
};

export const adminDataProviders: AdminifyOutletRouteProviders = [
    adminDataProvider,
    typedAdminDataProvider,
    adminDataPropertyProvider
];
