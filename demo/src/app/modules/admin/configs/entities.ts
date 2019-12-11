import {DefaultRestEntityServiceFactory, EntityServiceProvider, IAdminifyEntityService, RestEntityService} from '@ngx-adminify/entity';
import {EntityService} from './entities/entity.service';

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

export const entityProviders: EntityServiceProvider[] = [
    {
        provide: 'test',
        useValue: entity
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

