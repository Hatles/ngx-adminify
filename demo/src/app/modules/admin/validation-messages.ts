import {ValidationMessageOption} from '@ngx-formly/core/lib/services/formly.config';

export function minlengthValidationMessage(err, field) {
    return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
    return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field) {
    return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
    return `This value should be less than ${field.templateOptions.max}`;
}

export const validationMessages: ValidationMessageOption[] = [
    { name: 'required', message: 'This field is required' },
    { name: 'minlength', message: minlengthValidationMessage },
    { name: 'maxlength', message: maxlengthValidationMessage },
    { name: 'min', message: minValidationMessage },
    { name: 'max', message: maxValidationMessage },
];
