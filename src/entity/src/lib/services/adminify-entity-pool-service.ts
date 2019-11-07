import {Injectable, InjectionToken, Injector, StaticProvider, ɵcreateInjector as createInjector} from '@angular/core';
import {EntityServiceProvider} from '../entity-config';
import {IAdminifyEntityService} from '../adminify-entity-service';

export interface RegisteredEntityServiceToken {
    name: string;
    token: any;
}

function createEntityServiceToken(name: string): InjectionToken<IAdminifyEntityService> {
    return new InjectionToken<IAdminifyEntityService>('ENTITY_SERVICE_' + name);
}

@Injectable()
export class AdminifyEntityPoolService implements Injector {

    injector: Injector;

    tokens: RegisteredEntityServiceToken[];

    constructor(public parent: Injector) { }

    buildEntities(providers: EntityServiceProvider[]) {
        if (this.injector) {
            throw new Error('Service AdminifyEntityPoolService is already initialized.');
        }

        const entityProviders = providers.map(p => {
            const token = createEntityServiceToken(p.name);
            return {...p.provider, provide: token} as StaticProvider;
        });

        this.injector = createInjector(AdminifyEntityPoolService, this.parent, entityProviders);
    }

    get(token: any, notFoundValue?: any): any {
        return this.injector.get(token, notFoundValue);
    }

    getEntityService(name: string): any {
        return this.injector.get(this.getEntityToken(name));
    }

    getEntityToken(name: string): any {
        return this.tokens.find(t => t.name === name).token;
    }
}
