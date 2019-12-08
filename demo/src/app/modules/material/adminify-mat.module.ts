import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminifyMatRootComponent} from './adminify-mat-root/adminify-mat-root.component';
import {MatFormFieldModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {SharedModule} from '../../shared/shared.module';
import {AdminifyRouterModule} from '@ngx-adminify/router';
import { AdminifyMatListActionComponent } from './components/adminify-mat-list-action/adminify-mat-list-action.component';
import {AdminifyModule} from '@ngx-adminify/core';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [AdminifyMatRootComponent, AdminifyMatListActionComponent],
    entryComponents: [AdminifyMatRootComponent, AdminifyMatListActionComponent],
    exports: [AdminifyMatRootComponent, AdminifyMatListActionComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatMenuModule,
        LoadingBarRouterModule,
        AdminifyRouterModule,
        SharedModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        AdminifyModule
    ]
})
export class AdminifyMatModule {
}
