import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {AdminifyModule} from '@ngx-adminify/core';
import {AdminifyRouterModule} from '@ngx-adminify/router';
import {AdminifyEntityModule, EntityRestModule} from '@ngx-adminify/entity';
import {HttpClientModule} from '@angular/common/http';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {DialogModule} from './dialog/dialog.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        HttpClientModule,
        AdminifyModule.forRoot(),
        AdminifyRouterModule.forRoot(),
        AdminifyEntityModule.fotRoot(),
        EntityRestModule.forRoot({}, {root: 'https://jsonplaceholder.typicode.com', getDelay: 1000, saveDelay: 1000}),
        FormlyModule.forRoot(),
        DialogModule.forRoot(),
        FormlyMaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
