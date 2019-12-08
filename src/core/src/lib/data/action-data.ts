// tslint:disable-next-line:interface-over-type-literal
import {Data} from '@angular/router';

export class ActionData {
    data: Data;
}

export class TypedActionData<TData extends Data> {
    data: TData;
}

export class ActionDataPropertyToken {
    property: string;
    defaultValue: any;

    constructor(property: string, defaultValue?: any) {
        this.property = property;
        this.defaultValue = defaultValue;
    }
}

export function ActionDataProperty(property: string, defaultValue?: any): ActionDataPropertyToken {
    return new ActionDataPropertyToken(property, defaultValue);
}

