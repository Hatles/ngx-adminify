import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {adminComponents, AdminRoutingModule} from './admin-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMatToggleModule} from '@ngx-formly/material/toggle';
import {MatCardModule} from '@angular/material';
import {wrapperOptions, wrappers} from './components/wrappers/wrappers';
import {typeOptions, types} from './components/types/types';
import {ActiveAdminService} from './services/active-admin.service';
import {validationMessages} from './validation-messages';
import {FormlySelectModule} from '@ngx-formly/core/select';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormlyModule.forChild({
            wrappers: wrapperOptions,
            types: typeOptions,
            validationMessages: validationMessages
        }),
        FormlyMatToggleModule,
        FormlySelectModule,

        MatCardModule,
    ],
    providers: [
        ActiveAdminService
    ],
    declarations: [
        adminComponents,
        wrappers,
        types,
    ],
    entryComponents: [
        adminComponents
    ]
})
export class AdminModule {
}
