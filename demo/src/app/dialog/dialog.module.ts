import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoadSpinnerDialogComponent } from './components/load-spinner-dialog/load-spinner-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {DialogService} from './dialog.service';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatCommonModule } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
    declarations: [
        ConfirmDialogComponent,
        LoadSpinnerDialogComponent,
    ],
    imports: [
        CommonModule,
        MatCommonModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
    exports: []
})
export class DialogModule {
    static forRoot(): ModuleWithProviders<DialogModule> {
        return {
            ngModule: DialogModule,
            providers: [
                DialogService
            ],
        };
    }
}
