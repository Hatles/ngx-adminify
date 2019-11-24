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

    constructor(property: string) {
        this.property = property;
    }
}

export function AdminDataProperty(property: string): AdminDataPropertyToken {
    return new AdminDataPropertyToken(property);
}

