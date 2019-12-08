import {Data} from '@angular/router';

export class AdminsData {
    data: Data;
}

export class TypedAdminsData<TData extends Data> {
    data: TData;
}

export class AdminsDataPropertyToken {
    property: string;
    defaultValue: any;

    constructor(property: string, defaultValue?: any) {
        this.property = property;
        this.defaultValue = defaultValue;
    }
}

export function AdminsDataProperty(property: string, defaultValue?: any): AdminsDataPropertyToken {
    return new AdminsDataPropertyToken(property, defaultValue);
}
