// tslint:disable-next-line:interface-over-type-literal
import {Data} from '@angular/router';

export class AdminData {
    data: Data;
}

export class TypedAdminData<TData extends Data> {
    data: TData;
}

export class AdminDataPropertyToken {
    property: string;
    defaultValue: any;

    constructor(property: string, defaultValue?: any) {
        this.property = property;
        this.defaultValue = defaultValue;
    }
}

export function AdminDataProperty(property: string, defaultValue?: any): AdminDataPropertyToken {
    return new AdminDataPropertyToken(property, defaultValue);
}

