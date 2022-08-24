import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { provideDynamicRoutes } from "@ngx-adminify/router";

// const routes: Routes = [
//     {path: 'general', loadChildren: loadDynamicModule(() => import('./modules/general/general.module').then(m => m.GeneralModule))},
//     {path: 'admin', loadChildren: loadDynamicModule(() => import('./modules/admin/admin.module').then(m => m.AdminModule))},
//     {path: '', redirectTo: 'admin', pathMatch: 'full'},
// ];

@NgModule({
    imports: [
        // RouterModule.forRoot(routes),
        RouterModule.forRoot([]),
    ],
    exports: [
        RouterModule,
    ],
    declarations: [],
    providers: [
        provideDynamicRoutes(() => [
            {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
            {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
            {path: '', redirectTo: 'admin', pathMatch: 'full'},
        ])
        // provideRoutes( [
        //     {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
        //     {path: 'admin', loadChildren: loadDynamicModule(() => import('./modules/admin/admin.module').then(m => m.AdminModule))},
        //     {path: '', redirectTo: 'admin', pathMatch: 'full'},
        // ])
        // {
        //     provide: ROUTES,
        //     useFactory: () => (
        //         [
        //             {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
        //             {path: 'admin', loadChildren: loadDynamicModule(() => import('./modules/admin/admin.module').then(m => m.AdminModule))},
        //             {path: '', redirectTo: 'admin', pathMatch: 'full'},
        //         ]
        //     ),
        //     multi: true
        // }
    ]
})
export class AppRoutingModule {
}
