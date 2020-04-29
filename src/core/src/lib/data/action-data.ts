// tslint:disable-next-line:interface-over-type-literal
import {Data} from '@angular/router';

export class ActionData {
    data: Data;
}

export class TypedActionData<TData extends Data> {
    data: TData;
}

export const ActionDataPropertyTokenType = 'ActionDataPropertyToken';
export type ActionDataPropertyToken = {property: string, defaultValue: any, tokenType: string};

export function ActionDataProperty(property: string, defaultValue?: any): ActionDataPropertyToken {
    return {property: property, defaultValue: defaultValue, tokenType: ActionDataPropertyTokenType};
}

