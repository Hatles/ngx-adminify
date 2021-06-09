import {Component, Inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {AdminActionBaseComponent} from '../admin-action-base/admin-action-base.component';
import {Admin, AdminAction} from '@ngx-adminify/core';
import {AdminifyEntityService, EntityEditConfigsToken, EntityEditMode, EntityEditModeToken} from '@ngx-adminify/entity';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {Observable, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {RouteParam} from '@ngx-adminify/router';

@Component({
    selector: 'demo-admin-edit-action-base',
    templateUrl: './admin-edit-action-base.component.html',
    styleUrls: ['./admin-edit-action-base.component.scss']
})
export class AdminEditActionBaseComponent extends AdminActionBaseComponent implements OnInit, OnDestroy {

    entityValue: any;
    loading: boolean;
    submitting: boolean;
    form: FormGroup;
    onDestroy: Subject<void> = new Subject();
    createMode: boolean;

    id: Observable<string>;

    constructor(
        admin: Admin,
        action: AdminAction,
        entity: AdminifyEntityService,
        injector: Injector,
        @Inject(EntityEditModeToken) public mode: EntityEditMode,
        @Inject(EntityEditConfigsToken) public editConfigs: FormlyFieldConfig[]
    ) {
        super(admin, action, entity);

        this.id = injector.get(RouteParam('id'));
        this.createMode = mode === 'create';
    }

    ngOnInit() {
        this.form = new FormGroup({});

        if (!this.createMode) {
            this.id.pipe(switchMap(id => {
                    this.loading = true;
                    return this.entity.get(+id);
                }), takeUntil(this.onDestroy)
            ).subscribe(result => {
                this.entityValue = result;
                this.loading = false;
            });
        } else {
            this.entityValue = {};
        }
    }

    onSubmit() {
        if (this.createMode) {
            this.create((result) => alert(result.id));
        } else {
            this.edit((result) => alert(result.id));
        }
    }

    create(callback: (result: any) => void) {
        this.submitting = true;
        this.entity.create(this.form.value).subscribe((result) => {
            this.submitting = false;

            if (callback) {
                callback(result);
            }
        });
    }

    edit(callback: (result: any) => void) {
        this.submitting = true;
        this.entity.update({...this.entityValue, ...this.form.value}).subscribe((result) => {
            this.submitting = false;

            if (callback) {
                callback(result);
            }
        });
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    createAndAdd() {
        this.create(() => this.reset());
    }

    reset() {
        if (this.createMode) {
            this.form.reset();
        } else {

        }
    }

    clear() {
        this.entityValue = {};
    }
}
