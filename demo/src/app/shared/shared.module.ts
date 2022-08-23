import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import {WithLoadingPipe} from './pipes/with-loading.pipe';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule, MatPseudoCheckboxModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
    imports: [
        CommonModule,
        MatTooltipModule,
        MatTabsModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
    ],
    exports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatMenuModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatPseudoCheckboxModule,
        MatOptionModule,
        MatSelectModule,

        WithLoadingPipe
    ],
    declarations: [
        WithLoadingPipe
    ],
    providers: [
    ],
})
export class SharedModule { }
