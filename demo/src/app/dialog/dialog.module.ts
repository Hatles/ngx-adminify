import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCommonModule, MatDialogModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoadSpinnerDialogComponent } from './components/load-spinner-dialog/load-spinner-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {DialogService} from './dialog.service';

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
    exports: [

    ],
    entryComponents: [
        ConfirmDialogComponent,
        LoadSpinnerDialogComponent,
    ]
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
