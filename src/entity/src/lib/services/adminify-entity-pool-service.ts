import {Injectable, InjectionToken, Injector, Optional, StaticProvider, Type, ɵcreateInjector as createInjector} from '@angular/core';
import {EntityServiceProvider} from '../entity-config';
import {IAdminifyEntityService} from '../adminify-entity-service';

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
        return this.injector.get(token, notFoundValue);
    }

    getEntityService(name: string): any {
        return this.injector.get(this.getEntityToken(name));
    }

    getEntityToken(name: string): any {
        return this.tokens.find(t => t.name === name).token;
    }
}
