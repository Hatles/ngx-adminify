import {Data} from '@angular/router';

export class AdminsData {
    data: Data;
}

export class TypedAdminsData<TData extends Data> {
    data: TData;
}

export class AdminsDataPropertyToken {
    property: string;

    constructor(property: string) {
        this.property = property;
    }
}

export function AdminsDataProperty(property: string): AdminsDataPropertyToken {
    return new AdminsDataPropertyToken(property);
}
