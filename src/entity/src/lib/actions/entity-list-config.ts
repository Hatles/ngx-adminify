/* tslint:disable:max-line-length */
import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';

export const EntityListConfigsToken = new InjectionToken<EntityListConfigs>('ENTITY_LIST_CONFIGS_TOKEN');

export type EntityListConfigs = EntityListConfig[];

export interface EntityListConfig {
    /**
     * The key that relates to the model. This will link the field value to the model
     */
    key?: string;

    /**
     * This allows you to specify the `id` of your field. Note, the `id` is generated if not set.
     */
    id?: string;

    /**
     * If you wish, you can specify a specific `name` for your field. This is useful if you're posting the form to a server using techniques of yester-year.
     */
    name?: string;

    /**
     *  It is expected to be the name of the wrappers.
     *  The formly field template will be wrapped by the first wrapper, then the second, then the third, etc.
     *  You can also specify these as part of a type (which is the recommended approach).
     */
    wrappers?: string[];

    /**
     * Whether to hide the field. Defaults to false. If you wish this to be conditional use `hideExpression`
     */
    hide?: boolean;

    /**
     * Conditionally hiding Field based on values from other Fields
     */
    hideExpression?: boolean | string | ((model: any, formState: any, field?: EntityListConfig) => boolean);

    /**
     * An object where the key is a property to be set on the main field config and the value is an expression used to assign that property.
     */
    expressionProperties?: { [property: string]: string | ((model: any, formState: any, field?: EntityListConfig) => any) | Observable<any> };

    /**
     * You can specify your own class that will be applied to the `formly-field` component.
     */
    className?: string;

    /**
     * Specify your own class that will be applied to the `formly-group` component.
     */
    fieldGroupClassName?: string;

    /**
     * A field group is a way to group fields together, making advanced layout very simple.
     * It can also be used to group fields that are associated with the same model (useful if it's different than the model for the rest of the fields).
     */
    fieldGroup?: EntityListConfig[];

    fieldArray?: EntityListConfig;

    /**
     * This should be a formly-field type added either by you or a plugin. More information over at Creating Formly Fields.
     */
    type?: string;

    /**
     * Use `defaultValue` to initialize it the model. If this is provided and the value of the model at compile-time is undefined, then the value of the model will be assigned to `defaultValue`.
     */
    defaultValue?: any;
}

export interface EntityListTemplateOptions {
    type?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    options?: any[] | Observable<any[]>;
    rows?: number;
    cols?: number;
    description?: string;
    hidden?: boolean;
    max?: number;
    min?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string|RegExp;
    required?: boolean;
    tabindex?: number;
    readonly?: boolean;
    attributes?: { [key: string]: string|number };
    step?: number;
    [additionalProperties: string]: any;
}
