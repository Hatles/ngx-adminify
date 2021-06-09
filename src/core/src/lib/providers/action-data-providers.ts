import {AdminifyOutletRouteProvider, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {ActionData, ActionDataPropertyToken, ActionDataPropertyTokenType, TypedActionData} from '../data/action-data';
import {ActivatedRoute} from '@angular/router';
import {AdminAction} from '../admin-action';

export const actionDataProvider: AdminifyOutletRouteProvider = {
    provide: ActionData,
    useFactory: actionDataProviderFn,
    deps: [AdminAction]
};
export function actionDataProviderFn(route: ActivatedRoute, token: any, action: AdminAction): ActionData {
    return { data: action.getData() };
}

export const typedActionDataProvider: AdminifyOutletRouteProvider = {
    provide: TypedActionData,
    useFactory: typedActionDataProviderFn,
    deps: [AdminAction]
};
export function typedActionDataProviderFn(route: ActivatedRoute, token: any, action: AdminAction): TypedActionData<any> {
    return { data: action.getData() };
}

export const actionDataPropertyProvider: AdminifyOutletRouteProvider = {
    provideFn: actionDataPropertyProviderProvideFn,
    useFactory: actionDataPropertyProviderFn,
    deps: [AdminAction]
};
export function actionDataPropertyProviderProvideFn(token: any): boolean {
    return token != null && token.tokenType === ActionDataPropertyTokenType;
}
export function actionDataPropertyProviderFn(route: ActivatedRoute, token: ActionDataPropertyToken, action: AdminAction): any {
    return action.getData(token.property, token.defaultValue);
}

export const actionDataProviders: AdminifyOutletRouteProviders = [
    actionDataProvider,
    typedActionDataProvider,
    actionDataPropertyProvider
];
