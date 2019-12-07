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
import {MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';

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

        WithLoadingPipe
    ],
    declarations: [
        WithLoadingPipe
    ],
    providers: [
    ],
})
export class SharedModule { }
