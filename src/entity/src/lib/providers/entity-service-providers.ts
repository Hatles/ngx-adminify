import {
    ClassSansProvider,
    ExistingSansProvider,
    FactorySansProvider,
    ValueSansProvider
} from '@angular/core';

export declare interface EntityValueProvider extends ValueSansProvider {
    provide: string;
}

export declare interface EntityClassProvider extends ClassSansProvider {
    provide: string;
}

export declare interface EntityExistingProvider extends ExistingSansProvider {
    provide: string;
}

export declare interface EntityFactoryProvider extends FactorySansProvider {
    provide: string;
}
