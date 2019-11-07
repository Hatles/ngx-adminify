import {EntityAdminsConfig} from './entity-admin-config';
import {InjectionToken, StaticProvider} from '@angular/core';

export const ENTITY_SERVICE_PROVIDER = new InjectionToken<EntityServiceProvider>('ENTITY_SERVICE_PROVIDER');

export interface EntityServiceProvider {
    name: string;
    provider: StaticProvider;
}

export interface EntityConfig {
    admin: EntityAdminsConfig;
    entities: EntityServiceProvider[];
}
