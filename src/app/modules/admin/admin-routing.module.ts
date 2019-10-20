import {NgModule, Type} from '@angular/core';
import {AdminsConfig} from '../../admin/core/adminConfig';
import {AdminifyModule} from '../../admin/core/adminify.module';
import {AdminRootComponent} from './components/admin-root/admin-root.component';
import {AdminBaseComponent} from './components/admin-base/admin-base.component';
import {AdminActionBaseComponent} from './components/admin-action-base/admin-action-base.component';
import {AdminDashboardBaseComponent} from './components/admin-dashboard-base/admin-dashboard-base.component';
import {dataRouteFinder} from '@app/admin/core/dataRouteFinder';

export const adminComponents: Type<any>[] = [
    AdminRootComponent,
    AdminDashboardBaseComponent,
    AdminBaseComponent,
    AdminActionBaseComponent
];

const admins: AdminsConfig = {
    path: 'adminconfig',
    data: { test: 'test' },
    component: AdminRootComponent,
    rootFinder: dataRouteFinder('admin'),
    defaultAdminName: 'dashboard',
    admins: [
        {
            name: 'dashboard',
            path: 'dashboard',
            component: AdminDashboardBaseComponent
        },
        {
            name: 'test',
            path: 'test',
            component: AdminBaseComponent,
            actions: [
                {
                    name: 'view',
                    path: 'view',
                    component: AdminActionBaseComponent
                }
            ],
            defaultActionName: 'view'
        }
    ]
};

@NgModule({
    imports: [
        AdminifyModule.withConfig(admins),
    ],
    exports: [
        AdminifyModule,
    ],
    providers: []
})
export class AdminRoutingModule {
}
