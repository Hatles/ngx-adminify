import {Inject, Injectable, InjectionToken, Optional, Provider, Type} from '@angular/core';

export const ADMIN_COMPONENT_DECLARATION = new InjectionToken<AdminComponentDeclaration>('ADMIN_COMPONENT_DECLARATION');
export const ADMIN_COMPONENTS_DECLARATION = new InjectionToken<AdminComponentDeclaration[]>('ADMIN_COMPONENTS_DECLARATION');

export interface AdminComponentDeclaration {
    name: string;
    component: Type<any>;
}

export function declareAdminComponent(name: string, component: Type<any>): Provider {
    return provideAdminComponentDeclaration({
            name: name,
            component: component
        });
}

export function provideAdminComponentDeclaration(declaration: AdminComponentDeclaration): Provider {
    return {
        provide: ADMIN_COMPONENT_DECLARATION,
        multi: true,
        useValue: declaration
    };
}

export function declareAdminComponents(declarations: AdminComponentDeclaration[]): Provider {
    return provideAdminComponentsDeclaration(declarations);
}

export function provideAdminComponentsDeclaration(declarations: AdminComponentDeclaration[]): Provider {
    return {
        provide: ADMIN_COMPONENTS_DECLARATION,
        multi: true,
        useValue: declarations
    };
}

@Injectable()
export class AdminComponentDictionary {
    private components: AdminComponentDeclaration[];

    constructor(
        @Inject(ADMIN_COMPONENT_DECLARATION) @Optional() components: AdminComponentDeclaration[],
        @Inject(ADMIN_COMPONENTS_DECLARATION) @Optional() listComponents: AdminComponentDeclaration[][]) {
        this.components = [
            ...(listComponents || []).reduce((acc, comps) => [...acc, ...comps], []),
            ...(components || [])
        ];
    }

    get(component: string): Type<any> {
        const componentDeclaration = this.components.find(c => c.name === component);
        return componentDeclaration ? componentDeclaration.component : undefined;
    }

    add(name: string, component: Type<any>) {
        return this.components.push({
            name: name, component: component
        });
    }
}
