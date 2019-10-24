import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminifyOutletRouteProviders} from "../../../src/router/src/public_api";
import {AdminifyRouterModule} from "../../../src/router/src/public_api";
import {AdminifyModule} from "../../../src/core/src/public_api";

const routes: Routes = [
    {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
    {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
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
