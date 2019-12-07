import {NgModule, Type} from '@angular/core';
import {AdminRootComponent} from './components/admin-root/admin-root.component';
import {AdminBaseComponent} from './components/admin-base/admin-base.component';
import {AdminActionBaseComponent} from './components/admin-action-base/admin-action-base.component';
import {AdminDashboardBaseComponent} from './components/admin-dashboard-base/admin-dashboard-base.component';
import {AdminifyModule, AdminsConfig, dataRouteFinder} from '@ngx-adminify/core';
import {AdminifyMatModule} from '../material/adminify-mat.module';
import {AdminifyMatRootComponent} from '../material/adminify-mat-root/adminify-mat-root.component';
import {
    AdminifyEntityModule, DefaultRestEntityServiceFactory,
    EntityAdminsConfig,
    EntityConfig,
    entityFactory, EntityListConfigs,
    EntityServiceProvider,
    IAdminifyEntityService, RestEntityService
} from '@ngx-adminify/entity';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {AdminViewActionBaseComponent} from './components/admin-view-action-base/admin-view-action-base.component';
import {AdminListActionBaseComponent} from './components/admin-list-action-base/admin-list-action-base.component';
import {AdminEditActionBaseComponent} from './components/admin-edit-action-base/admin-edit-action-base.component';
import {FormlyFieldConfig} from '@ngx-formly/core';

export class EntityService implements IAdminifyEntityService {

    private entities: BehaviorSubject<any[]>;

    constructor(entityList: any[]) {
        this.entities = new BehaviorSubject(entityList);
    }

    create(input: any): Observable<any> {
        this.entities.next([...this.entities.value, input]);
        return of(input).pipe(delay(1000));
    }

    delete(input: any): Observable<any> {
        this.entities.next(this.entities.value.filter(e => e.id !== input));
        return of().pipe(delay(1000));
    }

    get(input: any): Observable<any> {
        return this.entities.pipe(map(entityList => entityList.find(e => e.id === input)), delay(1000));
    }

    getAll(): Observable<any> {
        return this.entities.asObservable().pipe(delay(1000));
    }

    update(input: any): Observable<any> {
        return of(input).pipe(delay(1000));
    }
}

export const adminComponents: Type<any>[] = [
    AdminRootComponent,
    AdminDashboardBaseComponent,
    AdminBaseComponent,
    AdminActionBaseComponent,
    AdminListActionBaseComponent,
    AdminViewActionBaseComponent,
    AdminEditActionBaseComponent
];

const todoListConfigs: EntityListConfigs = [
    {name: 'id'},
    {name: 'title'},
    {name: 'completed'},
];

const userListConfigs: EntityListConfigs = [
    {name: 'id'},
    {name: 'name'},
    {name: 'username'},
    {name: 'email'},
];

const todoEditConfigs: FormlyFieldConfig[] = [
    {
        key: 'title',
        type: 'input',
    },
    {
        key: 'completed',
        type: 'toggle',
    },
];

const userEditConfigs: FormlyFieldConfig[] = [
    {
        templateOptions: {
            label: 'Form'
        },
        wrappers: [
            'panel'
        ],
        type: 'tab-group',
        fieldGroup: [
            {
                templateOptions: {
                    label: 'Global Info'
                },
                wrappers: [
                    'panel'
                ],
                fieldGroup: [
                    {
                        key: 'name',
                        type: 'input',
                    },
                    {
                        key: 'username',
                        type: 'input',
                        templateOptions: {
                            required: true,
                            label: 'Username',
                        }
                    },
                    {
                        key: 'email',
                        type: 'input',
                    },
                ]
            },
            {
                key: 'address',
                templateOptions: {
                    label: 'Address'
                },
                wrappers: [
                    'panel'
                ],
                fieldGroup: [
                    {
                        key: 'street',
                        type: 'input',
                        templateOptions: {
                            required: true,
                            type: 'text',
                            label: 'Street',
                        },
                    },
                    {
                        key: 'suite',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Suite',
                        },
                    },
                    {
                        key: 'city',
                        type: 'input',
                        templateOptions: {
                            required: true,
                            type: 'text',
                            label: 'City',
                        },
                    },
                    {
                        key: 'zipcode',
                        type: 'input',
                        templateOptions: {
                            required: true,
                            type: 'text',
                            label: 'Zipcode',
                        },
                    },
                ],
            }
        ]
    }
];

const admins: EntityAdminsConfig = {
    path: 'adminconfig',
    data: {test: 'test'},
    component: AdminifyMatRootComponent,
    rootFinder: dataRouteFinder('admin'),
    defaultAdminName: 'dashboard',
    adminsData: {
        test: 'test admins'
    },
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
            adminData: {
                test: 'admin test',
                listConfigs: 'list'
            },
            actions: [
                {
                    name: 'dashboard',
                    path: 'dashboard',
                    component: AdminActionBaseComponent
                },
                // {
                //     name: 'list',
                //     path: 'list',
                //     component: AdminActionBaseComponent
                // },
                // {
                //     name: 'view',
                //     path: 'view/:id',
                //     component: AdminActionBaseComponent
                // }
            ],
            defaultActionName: 'dashboard',
            entityService: 'test',
            factory: entityFactory
        },
        {
            name: 'todos',
            path: 'todos',
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
                    component: AdminListActionBaseComponent,
                    actionData: {
                        entityList: todoListConfigs
                    }
                },
                {
                    name: 'view',
                    path: 'view/:id',
                    component: AdminViewActionBaseComponent,
                    actionData: {
                        entityView: todoListConfigs
                    }
                },
                {
                    name: 'edit',
                    path: 'edit/:id',
                    component: AdminEditActionBaseComponent,
                    actionData: {
                        entityEdit: todoEditConfigs
                    }
                },
                {
                    name: 'create',
                    path: 'create',
                    component: AdminEditActionBaseComponent,
                    actionData: {
                        entityEdit: todoEditConfigs,
                        entityEditMode: 'create'
                    }
                }
            ],
            defaultActionName: 'dashboard',
            entityService: 'todos',
            factory: entityFactory
        },
        {
            name: 'users',
            path: 'users',
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
                    component: AdminListActionBaseComponent,
                    actionData: {
                        entityList: userListConfigs
                    }
                },
                {
                    name: 'view',
                    path: 'view/:id',
                    component: AdminViewActionBaseComponent,
                    actionData: {
                        entityView: userListConfigs
                    }
                },
                {
                    name: 'edit',
                    path: 'edit/:id',
                    component: AdminEditActionBaseComponent,
                    actionData: {
                        entityEdit: userEditConfigs
                    }
                },
                {
                    name: 'create',
                    path: 'create',
                    component: AdminEditActionBaseComponent,
                    actionData: {
                        entityEdit: userEditConfigs,
                        entityEditMode: 'create'
                    }
                },
            ],
            defaultActionName: 'dashboard',
            entityService: 'users',
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
        provide: 'test',
        useValue: entity
    },
    {
        provide: 'test_rest',
        useFactory: entityRestFactory('test_rest'),
        deps: [DefaultRestEntityServiceFactory]
    },
    provideRestEntity('todos'),
    provideRestEntity('users')
];

export function provideEntityService(entityName: string, entityService: IAdminifyEntityService): EntityServiceProvider {
    return {
        provide: entityName,
        useValue: entityService
    };
}


export function provideRestEntity<TEntity>(entityName: string): EntityServiceProvider {
    return {
        provide: entityName,
        useFactory: entityRestFactory<TEntity>(entityName),
        deps: [DefaultRestEntityServiceFactory]
    };
}

export function entityRestFactory<TEntity>(entityName: string): (factory: DefaultRestEntityServiceFactory) => RestEntityService<TEntity> {
    return (factory: DefaultRestEntityServiceFactory) => factory.create<TEntity>(entityName);
}

const entities: EntityConfig = {
    admin: admins,
    entities: entityProviders
};

export function buildConfigFactory(): Promise<AdminsConfig> {
    return new Promise<AdminsConfig>(resolve => {
        resolve(admins);
    });
}

export function buildEntityConfigFactory(): Promise<EntityConfig> {
    return new Promise<EntityConfig>(resolve => {
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
