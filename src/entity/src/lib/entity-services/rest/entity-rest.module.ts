import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {DefaultRestEntityServiceFactory, REST_ENTITY_SERVICE_CONFIG, RestEntityServiceConfig} from './rest-entity-service';
import {DefaultHttpUrlGenerator, HttpUrlGenerator} from './http-url-generator';
import {DefaultPluralizer, PLURAL_NAMES_TOKEN, Pluralizer} from '../../utils/pluralizer';

export interface EntityRestModuleConfig {
    pluralNames?: { [name: string]: string };
}

/**
 * entity-data main module includes effects and HTTP data services
 * Configure with `forRoot`.
 * No `forFeature` yet.
 */
@NgModule({
    imports: [
    ],
    providers: [
        DefaultRestEntityServiceFactory,
        { provide: HttpUrlGenerator, useClass: DefaultHttpUrlGenerator },
        { provide: Pluralizer, useClass: DefaultPluralizer },
    ],
})
export class EntityRestModule {
    static forRoot(config?: EntityRestModuleConfig, factoryConfig?: RestEntityServiceConfig): ModuleWithProviders {
        config = config || {};

        const providers: Provider[] = factoryConfig ? [
                {
                    provide: REST_ENTITY_SERVICE_CONFIG, useValue: factoryConfig
                }
            ] : [];

        return {
            ngModule: EntityRestModule,
            providers: [
                {
                    provide: PLURAL_NAMES_TOKEN,
                    multi: true,
                    useValue: config.pluralNames ? config.pluralNames : {},
                },
                ...providers
            ],
        };
    }
}
