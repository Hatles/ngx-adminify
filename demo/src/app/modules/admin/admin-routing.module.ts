import {NgModule, Type} from '@angular/core';
import {AdminRootComponent} from './components/admin-root/admin-root.component';
import {AdminBaseComponent} from './components/admin-base/admin-base.component';
import {AdminActionBaseComponent} from './components/admin-action-base/admin-action-base.component';
import {AdminDashboardBaseComponent} from './components/admin-dashboard-base/admin-dashboard-base.component';
import {AdminifyModule, AdminsConfig, dataRouteFinder} from '@ngx-adminify/core';
import {AdminifyMatModule} from '../material/adminify-mat.module';
import {AdminifyMatRootComponent} from '../material/adminify-mat-root/adminify-mat-root.component';

export const adminComponents: Type<any>[] = [
    AdminRootComponent,
    AdminDashboardBaseComponent,
    AdminBaseComponent,
    AdminActionBaseComponent
];

const admins: AdminsConfig = {
    path: 'adminconfig',
    data: { test: 'test' },
    component: AdminifyMatRootComponent,
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
                    name: 'dashboard',
                    path: 'dashboard',
                    component: AdminActionBaseComponent
                },
                {
                    name: 'list',
                    path: 'list',
                    component: AdminActionBaseComponent
                },
                {
                    name: 'view',
                    path: 'view/:id',
                    component: AdminActionBaseComponent
                }
            ],
            defaultActionName: 'dashboard'
        }
    ]
};

export function buildConfigFactory(): Promise<AdminsConfig> {
    return new Promise<AdminsConfig>(resolve => {
        resolve(admins);
    });
}

@NgModule({
    imports: [
        AdminifyMatModule,
        AdminifyModule.withConfig(admins),
        // AdminifyModule.withConfigFactory(buildConfigFactory, []),
        // AdminifyModule.withBuilder({
        //     defaultAdminActionComponent: AdminActionBaseComponent,
        //     defaultAdminComponent: AdminBaseComponent,
        //     rootComponent: AdminRootComponent,
        // }, (builder => {
        //     builder
        //         .initConfig('adminconfig', { test: 'test' })
        //         .addDashboardAdmin(AdminDashboardBaseComponent, 'dashboard', 'dashboard')
        //         .addAdmin('test')
        //         .addAction('view')
        //     ;
        // }))
    ],
    exports: [
        AdminifyModule,
    ],
    providers: []
})
export class AdminRoutingModule {
}
