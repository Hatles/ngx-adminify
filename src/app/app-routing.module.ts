import {NgModule} from '@angular/core';
import {AdminifyModule, RouteData} from './admin/core/adminify.module';
import {AdminModule} from './modules/admin/admin.module';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterModule, Routes} from '@angular/router';
import {AdminOutletRouteProviders} from '@app/admin/core/adminOutletRouteProvider';
import {AdminRouterConfigLoaderFactory} from '@app/admin/core/adminRouterConfigLoaderFactory';

const routes: Routes = [
    {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
    // {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminifyModule)},
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
        AdminifyModule.fotRoot(
            providers
        ),
        AdminModule
    ],
    exports: [
        RouterModule,
    ],
    declarations: [],
    entryComponents: []
})
export class AppRoutingModule {
}
