import {PanelWrapperComponent} from './panel-wrapper/panel-wrapper.component';
import {WrapperOption} from '@ngx-formly/core/lib/services/formly.config';
import {Type} from '@angular/core';

export const wrapperOptions: WrapperOption[] = [
    { name: 'panel', component: PanelWrapperComponent }
];

export const wrappers: Type<any>[] = wrapperOptions.map(w => w.component);
