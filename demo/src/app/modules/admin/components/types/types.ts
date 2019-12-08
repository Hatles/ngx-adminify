
import {TypeOption} from '@ngx-formly/core/lib/services/formly.config';
import {Type} from '@angular/core';
import {FormlyMatTabGroupComponent} from './formly-mat-tab-group/formly-mat-tab-group.component';
import {FormEntityTypeComponent} from './form-entity-type/form-entity-type.component';

export const typeOptions: TypeOption[] = [
    { name: 'tab-group', component: FormlyMatTabGroupComponent },
    { name: 'entity', component: FormEntityTypeComponent },
];

export const types: Type<any>[] = typeOptions.map(w => w.component);
