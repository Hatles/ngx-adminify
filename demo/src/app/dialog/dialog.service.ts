import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ComponentType} from '@angular/cdk/portal';
import { LoadSpinnerDialogComponent } from './components/load-spinner-dialog/load-spinner-dialog.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';

@Injectable()
export class DialogService {

    constructor(private dialog: MatDialog) {
    }

    /**
     * Opens a modal dialog containing the given component.
     * @param componentOrTemplateRef Type of the component to load into the dialog,
     *     or a TemplateRef to instantiate as the dialog content.
     * @param config Extra configuration options.
     * @returns Reference to the newly-opened dialog.
     */
    open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> {
        return this.dialog.open(componentOrTemplateRef, config);
    }
    /**
     * Closes all of the currently-open dialogs.
     */
    closeAll(): void {
        this.dialog.closeAll();
    }
    /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     */
    getDialogById(id: string): MatDialogRef<any> | undefined {
        return this.dialog.getDialogById(id);
    }

    confirm(title: string, content: string, color: string = 'primary', confirmIcon: string = 'check', cancelIcon: string|false = 'clear'): Observable<boolean> {
        return this.open(ConfirmDialogComponent, {
            data: {
                title: title,
                content: content,
                confirmIcon: confirmIcon,
                cancelIcon: cancelIcon,
                color: color,
            },
        }).afterClosed().pipe(map(result => result === true));
    }

    warn(title: string, content: string, confirmIcon: string = 'check'): Observable<boolean> {
        return this.confirm(title, content, 'warn', confirmIcon);
    }

    info(title: string, content: string, color: string = 'primary', confirmIcon: string = 'check'): Observable<boolean> {
        return this.confirm(title, content, color, confirmIcon, false);
    }

    alert(title: string, content: string, confirmIcon: string = 'check'): Observable<boolean> {
        return this.info(title, content, 'warn', confirmIcon);
    }

    loader(): MatDialogRef<LoadSpinnerDialogComponent, any> {
        return this.open(LoadSpinnerDialogComponent, {
            disableClose: true
        });
    }
}
