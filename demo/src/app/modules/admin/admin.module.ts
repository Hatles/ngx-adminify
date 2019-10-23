import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {adminComponents, AdminRoutingModule} from './admin-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
    ],
    declarations: [adminComponents],
    entryComponents: [adminComponents]
})
export class AdminModule {
}
