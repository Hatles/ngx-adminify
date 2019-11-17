import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {adminComponents, AdminRoutingModule} from './admin-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ],
    declarations: [adminComponents],
    entryComponents: [adminComponents]
})
export class AdminModule {
}
