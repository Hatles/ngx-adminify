import {NgModule, Type} from '@angular/core';
import {AdminRootComponent} from './components/admin-root/admin-root.component';
import {AdminBaseComponent} from './components/admin-base/admin-base.component';
import {AdminActionBaseComponent} from './components/admin-action-base/admin-action-base.component';
import {AdminDashboardBaseComponent} from './components/admin-dashboard-base/admin-dashboard-base.component';
import {AdminifyModule, AdminsConfig, dataRouteFinder} from "@ngx-adminify/core";

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

export function buildConfigFactory(): Promise<AdminsConfig> {
    return new Promise<AdminsConfig>(resolve => {
        resolve(admins);
    });
}

@NgModule({
    imports: [
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
