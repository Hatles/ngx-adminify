import {PanelWrapperComponent} from './panel-wrapper/panel-wrapper.component';
import {WrapperOption} from '@ngx-formly/core/lib/services/formly.config';
import {Type} from '@angular/core';
import {FormFieldWrapperComponent} from './form-field-wrapper/form-field-wrapper.component';

export const wrapperOptions: WrapperOption[] = [
    { name: 'panel', component: PanelWrapperComponent },
    { name: 'form-field', component: FormFieldWrapperComponent },
];

export const wrappers: Type<any>[] = wrapperOptions.map(w => w.component);
