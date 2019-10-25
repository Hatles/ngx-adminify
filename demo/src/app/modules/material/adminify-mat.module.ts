import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminifyMatRootComponent} from './adminify-mat-root/adminify-mat-root.component';
import {MatMenuModule} from "@angular/material";
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {SharedModule} from "../../shared/shared.module";
import {AdminifyRouterModule} from "@ngx-adminify/router";

@NgModule({
    declarations: [AdminifyMatRootComponent],
    entryComponents: [AdminifyMatRootComponent],
    exports: [AdminifyMatRootComponent],
    imports: [
        CommonModule,
        MatMenuModule,
        LoadingBarRouterModule,
        AdminifyRouterModule,
        SharedModule
    ]
})
export class AdminifyMatModule {
}
