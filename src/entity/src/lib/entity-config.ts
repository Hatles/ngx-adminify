import {EntityAdminsConfig} from './entity-admin-config';
import {
    InjectionToken,
} from '@angular/core';
import {
    EntityClassProvider,
    EntityExistingProvider,
    EntityFactoryProvider,
    EntityValueProvider
} from './providers/entity-service-providers';

export const ENTITY_SERVICE_PROVIDER = new InjectionToken<EntityServiceProvider>('ENTITY_SERVICE_PROVIDER');

export type EntityServiceProvider = EntityValueProvider | EntityClassProvider | EntityExistingProvider | EntityFactoryProvider;

export interface EntityConfig {
    admin: EntityAdminsConfig;
    entities: EntityServiceProvider[];
}
