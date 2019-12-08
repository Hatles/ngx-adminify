import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface ConfirmDialogData {
    title: string;
    content: string;
    color: string;
    confirmIcon: string;
    cancelIcon: string|false;
}

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmDialogComponent {

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
    }
}
