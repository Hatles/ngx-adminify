import {Injectable, InjectionToken, Injector, Optional, StaticProvider, Type, ɵcreateInjector as createInjector} from '@angular/core';
import {EntityServiceProvider} from '../entity-config';
import {IAdminifyEntityService} from '../adminify-entity-service';
import {
    EntityClassProvider,
    EntityExistingProvider,
    EntityFactoryProvider,
    EntityValueProvider
} from '../providers/entity-service-providers';

export interface RegisteredEntityServiceToken {
    name: string;
    token: any;
}

export declare class EntityInjectionToken<T> {
    protected _desc: string;
    readonly ngInjectableDef: never | undefined;
    constructor(_desc: string, options?: {
        providedIn?: Type<any> | 'root' | null;
        factory: () => T;
    });
    toString(): string;
}


function createEntityServiceToken(name: string): InjectionToken<IAdminifyEntityService> {
    return new InjectionToken<IAdminifyEntityService>('ENTITY_SERVICE_' + name);
}

@Injectable()
export class AdminifyEntityPoolService implements Injector {

    injector: Injector;

    tokens: RegisteredEntityServiceToken[];

    protected services: { [name: string]: IAdminifyEntityService } = {};

    constructor(public parent: Injector) { }

    buildEntities(providers: EntityServiceProvider[]) {
        if (this.injector) {
            throw new Error('Service AdminifyEntityPoolService is already initialized.');
        }

        this.tokens = [];
        const entityProviders = providers.map(p => {
            const token = createEntityServiceToken(p.provide);
            this.tokens.push({name: p.provide, token: token});
            return {...p, provide: token} as StaticProvider;
        });

        this.injector = createInjector(AdminifyEntityPoolService, this.parent, entityProviders);
    }

    get(token: any, notFoundValue?: any): any {
        return this.injector ? this.injector.get(token, notFoundValue) : this.parent.get(token, notFoundValue);
    }

    getEntityService(entityName: string): IAdminifyEntityService {
        entityName = entityName.trim();
        let service = this.services[entityName];
        if (!service) {
            service = this.injector.get(this.getEntityToken(entityName));
            this.services[entityName] = service;
        }
        return service;
    }

    getEntityToken(name: string): any {
        const token = this.tokens.find(t => t.name === name);
        return token ? token.token : undefined;
    }

    /**
     * Register an EntityCollectionDataService for an entity type
     * @param entityName - the name of the entity type
     * @param service - data service for that entity type
     *
     * Examples:
     *   registerService('Hero', myHeroDataService);
     *   registerService('Villain', myVillainDataService);
     */
    registerService(
        entityName: string,
        service: IAdminifyEntityService
    ) {
        this.services[entityName.trim()] = service;
    }

    /**
     * Register a batch of data services.
     * @param services - data services to merge into existing services
     *
     * Examples:
     *   registerServices({
     *     Hero: myHeroDataService,
     *     Villain: myVillainDataService
     *   });
     */
    registerServices(services: {
        [name: string]: IAdminifyEntityService;
    }) {
        this.services = { ...this.services, ...services };
    }

    registerProviders(providers: EntityServiceProvider[]) {
        providers.forEach(p => this.registerProvider(p));
    }

    registerProvider(provider: EntityServiceProvider) {
        const valueProvider = provider as EntityValueProvider;
        if (valueProvider.useValue) {
            return this.registerService(provider.provide, valueProvider.useValue);
        }

        const existingProvider = provider as EntityExistingProvider;
        if (existingProvider.useExisting) {
            return this.registerService(provider.provide, this.get(existingProvider.useExisting));
        }

        // const classProvider = provider as EntityClassProvider;
        // if (classProvider.useClass) {
        //     return this.registerService(provider.provide, classProvider.useClass);
        // }

        const factoryProvider = provider as EntityFactoryProvider;
        if (factoryProvider.useFactory) {
            return this.registerService(provider.provide, factoryProvider.useFactory.apply(null, (factoryProvider.deps || []).map(d => this.get(d))));
        }

        throw new Error('Invalid async entity provider with name :"' + provider.provide + '"');
    }
}
