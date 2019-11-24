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

    constructor(property: string) {
        this.property = property;
    }
}

export function ActionDataProperty(property: string): ActionDataPropertyToken {
    return new ActionDataPropertyToken(property);
}

