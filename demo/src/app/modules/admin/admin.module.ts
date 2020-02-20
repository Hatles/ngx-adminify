import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {adminComponentDeclarations, adminComponents, AdminRoutingModule} from './admin-routing.module';
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
import {AdminifyModule, declareAdminComponents} from '@ngx-adminify/core';
import {FormEntityTypeComponent} from "./components/types/form-entity-type/form-entity-type.component";
import {FormlyMatTabGroupComponent} from "./components/types/formly-mat-tab-group/formly-mat-tab-group.component";
import {PanelWrapperComponent} from "./components/wrappers/panel-wrapper/panel-wrapper.component";
import {AdminEditActionBaseComponent} from "./components/admin-edit-action-base/admin-edit-action-base.component";
import {AdminListActionBaseComponent} from "./components/admin-list-action-base/admin-list-action-base.component";
import {AdminViewActionBaseComponent} from "./components/admin-view-action-base/admin-view-action-base.component";
import {AdminDashboardBaseComponent} from "./components/admin-dashboard-base/admin-dashboard-base.component";
import {AdminBaseComponent} from "./components/admin-base/admin-base.component";
import {AdminRootComponent} from "./components/admin-root/admin-root.component";
import {AdminActionBaseComponent} from "./components/admin-action-base/admin-action-base.component";
import {FormFieldWrapperComponent} from "./components/wrappers/form-field-wrapper/form-field-wrapper.component";

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        AdminifyModule.forChild(),
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
        ActiveAdminService,
        declareAdminComponents(adminComponentDeclarations)
    ],
    declarations: [
        adminComponents,
        wrappers,
        types,

        FormEntityTypeComponent,
        FormlyMatTabGroupComponent,
        PanelWrapperComponent,
        AdminEditActionBaseComponent,
        AdminListActionBaseComponent,
        AdminViewActionBaseComponent,
        AdminDashboardBaseComponent,
        AdminBaseComponent,
        AdminRootComponent,
        AdminActionBaseComponent,
        FormFieldWrapperComponent
    ],
    entryComponents: [
        adminComponents
    ]
})
export class AdminModule {
}
