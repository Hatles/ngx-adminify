import {Inject, Injectable, InjectionToken, Optional, Provider} from '@angular/core';
import {AdminFactory} from './admin-factory';

export const ADMIN_FACTORY_DECLARATION = new InjectionToken<AdminFactoryDeclaration>('ADMIN_FACTORY_DECLARATION');

export interface AdminFactoryDeclaration {
    name: string;
    factory: AdminFactory;
}

export function declareAdminFactory(name: string, factory: AdminFactory): Provider {
    return provideAdminFactoryDeclaration({
        name: name,
        factory: factory
    });
}

export function provideAdminFactoryDeclaration(declaration: AdminFactoryDeclaration): Provider {
    return {
        provide: ADMIN_FACTORY_DECLARATION,
        multi: true,
        useValue: declaration
    };
}

export function declareAdminFactories(declarations: AdminFactoryDeclaration[]): Provider[] {
    return declarations.map(d => provideAdminFactoryDeclaration(d));
}

@Injectable()
export class AdminFactoryDictionary {
    private factories: AdminFactoryDeclaration[];

    constructor(@Inject(ADMIN_FACTORY_DECLARATION) @Optional() factories: AdminFactoryDeclaration[]) {
        this.factories = factories;
    }

    get(factory: string): AdminFactory {
        const factoryDeclaration = this.factories.find(c => c.name === factory);
        return factoryDeclaration ? factoryDeclaration.factory : undefined;
    }

    add(name: string, factory: AdminFactory) {
        return this.factories.push({
            name: name, factory: factory
        });
    }
}
