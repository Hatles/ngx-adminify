import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminifyMatRootComponent} from './adminify-mat-root/adminify-mat-root.component';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {SharedModule} from '../../shared/shared.module';
import {AdminifyRouterModule} from '@ngx-adminify/router';
import { AdminifyMatListActionComponent } from './components/adminify-mat-list-action/adminify-mat-list-action.component';
import {AdminifyModule} from '@ngx-adminify/core';
import {ReactiveFormsModule} from '@angular/forms';
import { TemplatePipe } from './components/adminify-mat-list-action/template.pipe';
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    declarations: [AdminifyMatRootComponent, AdminifyMatListActionComponent, TemplatePipe],
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
