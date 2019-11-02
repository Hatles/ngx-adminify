import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminifyRouterModule, AdminifyOutletRouteProviders} from "@ngx-adminify/router";
import {AdminifyModule} from "@ngx-adminify/core";

const routes: Routes = [
    {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
    {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
    {path: '', redirectTo: 'admin', pathMatch: 'full'},

];

const providers: AdminifyOutletRouteProviders = [
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes
        ),
        AdminifyModule.fotRoot(),
        AdminifyRouterModule.fotRoot({
            providers: providers
        }),
    ],
    exports: [
        RouterModule,
    ],
    declarations: [],
    entryComponents: []
})
export class AppRoutingModule {
}
