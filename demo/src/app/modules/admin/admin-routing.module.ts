import {NgModule, Type} from '@angular/core';
import {AdminRootComponent} from './components/admin-root/admin-root.component';
import {AdminBaseComponent} from './components/admin-base/admin-base.component';
import {AdminActionBaseComponent} from './components/admin-action-base/admin-action-base.component';
import {AdminDashboardBaseComponent} from './components/admin-dashboard-base/admin-dashboard-base.component';
import {AdminifyModule, AdminsConfig, dataRouteFinder} from '@ngx-adminify/core';
import {AdminifyMatModule} from '../material/adminify-mat.module';
import {AdminifyMatRootComponent} from '../material/adminify-mat-root/adminify-mat-root.component';
import {EntityConfig, EntityServiceProvider} from '../../../../../src/entity/src/lib/entity-config';
import {AdminifyEntityModule} from '../../../../../src/entity/src/lib/adminify-entity-module';
import {IAdminifyEntityService} from '../../../../../src/entity/src/lib/adminify-entity-service';
import {EntityService} from '../../app.module';
import {EntityAdminsConfig} from '../../../../../src/entity/src/lib/entity-admin-config';
import {entityFactory} from '../../../../../src/entity/src/lib/entity-factory';

export const adminComponents: Type<any>[] = [
    AdminRootComponent,
    AdminDashboardBaseComponent,
    AdminBaseComponent,
    AdminActionBaseComponent
];

const admins: EntityAdminsConfig = {
    path: 'adminconfig',
    data: { test: 'test' },
    component: AdminifyMatRootComponent,
    rootFinder: dataRouteFinder('admin'),
    defaultAdminName: 'dashboard',
    admins: [
        {
            name: 'dashboard',
            path: 'dashboard',
            component: AdminDashboardBaseComponent,
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
            defaultActionName: 'dashboard',
            entityService: 'test_2',
            factory: entityFactory
        }
    ]
};

const entity: IAdminifyEntityService = new EntityService([
    {
        id: 1,
        title: 'test 2 1'
    },
    {
        id: 2,
        title: 'test 2 2'
    },
]);

const entityProviders: EntityServiceProvider[] = [
    {
        provide: 'test_2',
        useValue: entity
    }
];

const entities: EntityConfig = {
    admin: admins,
    entities: entityProviders
};

export function buildConfigFactory(): Promise<AdminsConfig> {
    return new Promise<AdminsConfig>(resolve => {
        resolve(admins);
    });
}


@NgModule({
    imports: [
        AdminifyMatModule,
        // AdminifyModule.withConfig(admins),
        AdminifyEntityModule.forChild(entities),
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
