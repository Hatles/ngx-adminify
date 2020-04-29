import {NgModule, Type} from '@angular/core';
import {AdminRootComponent} from './components/admin-root/admin-root.component';
import {AdminBaseComponent} from './components/admin-base/admin-base.component';
import {AdminActionBaseComponent} from './components/admin-action-base/admin-action-base.component';
import {AdminDashboardBaseComponent} from './components/admin-dashboard-base/admin-dashboard-base.component';
import {AdminifyModule, AdminsConfig} from '@ngx-adminify/core';
import {AdminifyMatModule} from '../material/adminify-mat.module';
import {AdminifyEntityModule, EntityConfig} from '@ngx-adminify/entity';
import {AdminViewActionBaseComponent} from './components/admin-view-action-base/admin-view-action-base.component';
import {AdminListActionBaseComponent} from './components/admin-list-action-base/admin-list-action-base.component';
import {AdminEditActionBaseComponent} from './components/admin-edit-action-base/admin-edit-action-base.component';
import {admins} from './configs/admins';
import {entities} from './configs/configs';
import {AdminComponentDeclaration} from '@ngx-adminify/core';

export const adminComponentDeclarations: AdminComponentDeclaration[] = [
    { name: 'AdminRootComponent', component: AdminRootComponent},
    { name: 'AdminDashboardBaseComponent', component: AdminDashboardBaseComponent},
    { name: 'AdminBaseComponent', component: AdminBaseComponent},
    { name: 'AdminActionBaseComponent', component: AdminActionBaseComponent},
    { name: 'AdminListActionBaseComponent', component: AdminListActionBaseComponent},
    { name: 'AdminViewActionBaseComponent', component: AdminViewActionBaseComponent},
    { name: 'AdminEditActionBaseComponent', component: AdminEditActionBaseComponent}
];

export const adminComponents: Type<any>[] = [
    AdminRootComponent,
    AdminDashboardBaseComponent,
    AdminBaseComponent,
    AdminActionBaseComponent,
    AdminListActionBaseComponent,
    AdminViewActionBaseComponent,
    AdminEditActionBaseComponent
];

export function buildConfigFactory(): Promise<AdminsConfig> {
    return new Promise<AdminsConfig>(resolve => {
        resolve(admins);
    });
}

export function buildEntityConfigFactory(): Promise<EntityConfig> {
    return new Promise<EntityConfig>(resolve => {
        console.log(JSON.stringify(entities));
        resolve(entities);
    });
}


@NgModule({
    imports: [
        AdminifyMatModule,
        // AdminifyModule.withConfig(admins),
        // AdminifyEntityModule.forChild(entities),
        AdminifyEntityModule.withConfigFactory(buildEntityConfigFactory, []),
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
        // })),
    ],
    exports: [
        AdminifyModule,
    ],
    providers: []
})
export class AdminRoutingModule {
}
