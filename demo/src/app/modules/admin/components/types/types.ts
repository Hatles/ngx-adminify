
import {TypeOption, WrapperOption} from '@ngx-formly/core/lib/services/formly.config';
import {Type} from '@angular/core';
import {FormlyMatTabGroupComponent} from './formly-mat-tab-group/formly-mat-tab-group.component';

export const typeOptions: TypeOption[] = [
    { name: 'tab-group', component: FormlyMatTabGroupComponent },
];

export const types: Type<any>[] = typeOptions.map(w => w.component);
