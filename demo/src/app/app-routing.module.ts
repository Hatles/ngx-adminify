import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
    {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
    {path: '', redirectTo: 'admin', pathMatch: 'full'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes
        ),
    ],
    exports: [
        RouterModule,
    ],
    declarations: [],
    entryComponents: []
})
export class AppRoutingModule {
}
