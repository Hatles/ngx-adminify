import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {ActionData, ActionDataPropertyToken, TypedActionData} from '../data/action-data';
import {ActivatedRoute} from '@angular/router';
import {AdminAction} from '../admin-action';

export const actionDataProvider: AdminifyOutletRouteProvider = {
    provide: ActionData,
    factory: (route: ActivatedRoute, token: any, action: AdminAction): ActionData => ({ data: action.getData() }),
    deps: [AdminAction]
};

export const typedActionDataProvider: AdminifyOutletRouteProvider = {
    provide: TypedActionData,
    factory: (route: ActivatedRoute, token: any, action: AdminAction): TypedActionData<any> => ({ data: action.getData() }),
    deps: [AdminAction]
};

export const actionDataPropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: (token: any) => token instanceof ActionDataPropertyToken,
    factory: (route: ActivatedRoute, token: ActionDataPropertyToken, action: AdminAction): any => action.getData(token.property),
    deps: [AdminAction]
};

export const actionDataProviders: AdminifyOutletRouteProviders = [
    actionDataProvider,
    typedActionDataProvider,
    actionDataPropertyProvider
];
