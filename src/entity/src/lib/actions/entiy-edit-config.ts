import {InjectionToken} from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';

export type EntityEditMode = 'edit' | 'create';

export const EntityEditModeToken = new InjectionToken<EntityEditMode>('ENTITY_EDIT_CONFIGS_TOKEN');
export const EntityEditConfigsToken = new InjectionToken<FormlyFieldConfig[]>('ENTITY_EDIT_CONFIGS_TOKEN');
export const EntityCreateConfigsToken = new InjectionToken<FormlyFieldConfig[]>('ENTITY_CREATE_CONFIGS_TOKEN');
