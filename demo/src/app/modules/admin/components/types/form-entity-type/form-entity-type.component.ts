import {Component, ViewChild} from '@angular/core';
import {FieldType} from '@ngx-formly/material';
import {MatSelect, MatSelectChange} from '@angular/material';
import {Observable} from 'rxjs';
import {AdminifyEntityPoolService} from '../../../../../../../../src/entity/src/lib/services/adminify-entity-pool-service';
import {EntityService} from '../../../admin-routing.module';
import {IAdminifyEntityService} from '../../../../../../../../src/entity/src/lib/adminify-entity-service';

@Component({
    selector: 'demo-form-entity-type',
    templateUrl: './form-entity-type.component.html',
    styleUrls: ['./form-entity-type.component.scss'],
})
export class FormEntityTypeComponent extends FieldType {
    @ViewChild(MatSelect, <any> {static: true}) formFieldControl!: MatSelect;

    defaultOptions = {
        templateOptions: {
            valueProp: (item) => this.entityService.getKey(item),
            // labelProp: (item) => item.toString(),
        },
    };

    private selectAllValue!: { options: any, value: any[] };

    private _entities: Observable<any>;
    get entities(): Observable<any> {
        if (!this._entities) {
            this._entities = this.entityService.getAll({});
        }
        // return this.entityService.getAll();
        return this._entities;
    }

    private _entityService: IAdminifyEntityService;
    get entityService(): IAdminifyEntityService {
        if (!this._entityService) {
            this._entityService = this.pool.getEntityService(this.to.entity);
        }
        return this._entityService;
    }

    constructor(private pool: AdminifyEntityPoolService) {
        super();
    }

    getSelectAllState(options: any[]) {
        if (this.empty || this.value.length === 0) {
            return '';
        }


        return this.value.length !== this.getSelectAllValue(options).length
            ? 'indeterminate'
            : 'checked';
    }

    toggleSelectAll(options: any[]) {
        const selectAllValue = this.getSelectAllValue(options);
        this.formControl.setValue(
            !this.value || this.value.length !== selectAllValue.length
                ? selectAllValue
                : [],
        );
    }

    change($event: MatSelectChange) {
        if (this.to.change) {
            this.to.change(this.field, $event);
        }
    }

    compareWith(o1: any, o2: any) {
        return o1 === o2;
    }

    _getAriaLabelledby() {
        if (this.to.attributes && this.to.attributes['aria-labelledby']) {
            return this.to.attributes['aria-labelledby'];
        }

        if (this.formField && this.formField._labelId) {
            return this.formField._labelId;
        }

        return null;
    }

    private getSelectAllValue(options: any[]) {
        if (!this.selectAllValue || options !== this.selectAllValue.options) {
            const flatOptions: any[] = [];
            options.forEach(o => o.group
                ? flatOptions.push(...o.group)
                : flatOptions.push(o),
            );

            this.selectAllValue = {
                options,
                value: flatOptions.map(o => o.value),
            };
        }


        return this.selectAllValue.value;
    }
}
