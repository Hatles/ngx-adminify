import {Inject, Injectable, InjectionToken, Injector, Optional, Provider, Type} from '@angular/core';
import {IAdminFactory} from './admin-factory';

export const ADMIN_FACTORY_DECLARATION = new InjectionToken<AdminFactoryDeclaration>('ADMIN_FACTORY_DECLARATION');

export interface AdminFactoryDeclaration {
    name: string;
    instance?: IAdminFactory;
    factory?: Type<IAdminFactory>;
}

export function declareAdminFactory(name: string, factory: Type<IAdminFactory>): Provider {
    return provideAdminFactoryDeclaration({
        name: name,
        factory: factory
    });
}

export function declareAdminFactoryInstance(name: string, factory: IAdminFactory): Provider {
    return provideAdminFactoryDeclaration({
        name: name,
        instance: factory
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

    constructor(@Inject(ADMIN_FACTORY_DECLARATION) @Optional() factories: AdminFactoryDeclaration[],
                private injector: Injector) {
        this.factories = factories;
    }

    get(factory: string): IAdminFactory {
        const factoryDeclaration = this.factories.find(c => c.name === factory);

        if(!factoryDeclaration.instance && factoryDeclaration.factory) {
            factoryDeclaration.instance = this.injector.get(factoryDeclaration.factory);
        }

        return factoryDeclaration ? factoryDeclaration.instance : undefined;
    }

    add(name: string, factory: Type<IAdminFactory>) {
        return this.factories.push({
            name: name, factory: factory
        });
    }

    addInstance(name: string, factory: IAdminFactory) {
        return this.factories.push({
            name: name, instance: factory
        });
    }
}
