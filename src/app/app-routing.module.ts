import {NgModule} from '@angular/core';
import {AdminifyModule} from './admin/core/adminify-module';
import {RouterModule, Routes} from '@angular/router';
import {AdminifyRouterModule} from '@app/admin/router/adminify-router-module';
import {AdminifyOutletRouteProviders} from '@app/admin/router/adminify-outlet-route-provider';

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
