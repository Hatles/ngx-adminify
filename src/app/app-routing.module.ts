import {NgModule} from '@angular/core';
import {AdminifyModule, RouteData} from './admin/core/adminify-module';
import {ActivatedRouteSnapshot, RouterModule, Routes} from '@angular/router';
import {AdminOutletRouteProviders} from '@app/admin/router/admin-outlet-route-provider';
import {AdminifyRouterModule} from '@app/admin/router/adminify-router-module';

const routes: Routes = [
    {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
    {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
];

const providers: AdminOutletRouteProviders = [
    {
        provide: RouteData,
        factory: (route: ActivatedRouteSnapshot) => ({ data: route.data }),
        deps: []
    }
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
