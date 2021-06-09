import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';

const uncountable = [
    'sheep',
    'fish',
    'deer',
    'moose',
    'rice',
    'species',
    'equipment',
    'information',
    'money',
    'series',
];

/**
 * Mapping of entity type name to its plural
 */
export interface EntityPluralNames {
    [entityName: string]: string;
}

export const PLURAL_NAMES_TOKEN = new InjectionToken<EntityPluralNames>(
    '@ngx-adminify/entity/plural-names'
);

export abstract class Pluralizer {
    abstract pluralize(name: string): string;
}

@Injectable()
export class DefaultPluralizer {
    pluralNames: EntityPluralNames = {};

    constructor(
        @Optional()
        @Inject(PLURAL_NAMES_TOKEN)
            pluralNames: EntityPluralNames[]
    ) {
        // merge each plural names object
        if (pluralNames) {
            pluralNames.forEach(pn => this.registerPluralNames(pn));
        }
    }

    /**
     * Pluralize a singular name using common English language pluralization rules
     * Examples: "company" -> "companies", "employee" -> "employees", "tax" -> "taxes"
     */
    pluralize(name: string) {
        const plural = this.pluralNames[name];
        if (plural) {
            return plural;
        }
        // singular and plural are the same
        if (uncountable.indexOf(name.toLowerCase()) >= 0) {
            return name;
            // vowel + y
        } else if (/[aeiou]y$/.test(name)) {
            return name + 's';
            // consonant + y
        } else if (name.endsWith('y')) {
            return name.substr(0, name.length - 1) + 'ies';
            // endings typically pluralized with 'es'
        } else if (/[s|ss|sh|ch|x|z]$/.test(name)) {
            return name + 'es';
        } else {
            return name + 's';
        }
    }

    /**
     * Register a mapping of entity type name to the entity name's plural
     * @param pluralNames {EntityPluralNames} plural names for entity types
     */
    registerPluralNames(pluralNames: EntityPluralNames): void {
        this.pluralNames = { ...this.pluralNames, ...(pluralNames || {}) };
    }
}
