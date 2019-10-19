import {NgModule} from '@angular/core';
import {ActivatedRoute, Router, RouterModule, Routes} from '@angular/router';
import {AdminifyModule} from './admin/core/adminify.module';
import {AdminModule} from './modules/admin/admin.module';

const routes: Routes = [
  {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
  // {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminifyModule)},
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes
        ),
        AdminifyModule.fotRoot(),
        AdminModule
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        {provide: ActivatedRoute, useFactory: rootRoute, deps: [Router]},
    ],
    declarations: [],
    entryComponents: []
})
export class AppRoutingModule { }

export function rootRoute(router: Router): ActivatedRoute {
    router.routerState.root['test'] = 'test';
    return router.routerState.root;
}
