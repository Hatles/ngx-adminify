import {Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
    selector: 'demo-formly-mat-tab-group',
    templateUrl: './formly-mat-tab-group.component.html',
    styleUrls: ['./formly-mat-tab-group.component.scss'],
    host: {
        '[class]': 'field.fieldGroupClassName || ""',
    },
})
export class FormlyMatTabGroupComponent extends FieldType {
    defaultOptions = {
        defaultValue: {},
    };
}
