import { Compiler, inject, Injector, NgModule, NgModuleFactory, NgModuleRef, Type } from '@angular/core';
import { LoadChildrenCallback, provideRoutes, RouterModule, ROUTES, Routes } from '@angular/router';
import { DYNAMIC_MODULE_INITIALIZER } from "../../../src/router/src/lib/dynamic-module-initializer";
import { forkJoin, from, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { DynamicModuleRef } from "../../../src/router/src/lib/dynamic-module-ref";
import { loadDynamicModule, provideDynamicRoutes } from "../../../src/router/src/lib/dynamic-module-loader";

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
