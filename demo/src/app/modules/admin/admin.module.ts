import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {adminComponents, AdminRoutingModule} from './admin-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { AdminListActionBaseComponent } from './components/admin-list-action-base/admin-list-action-base.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ],
    declarations: [adminComponents, AdminListActionBaseComponent],
    entryComponents: [adminComponents]
})
export class AdminModule {
}
