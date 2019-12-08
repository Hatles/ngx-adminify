import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActionDataProperty, Admin, AdminAction, AdminDataProperty} from '@ngx-adminify/core';
import {AdminifyEntityService, EntityListConfigs, EntityListConfigsToken} from '@ngx-adminify/entity';
import {RouteData, RoutePropertySnapshot} from '@ngx-adminify/router';
import {combineLatest, Observable, Subject, throwError} from 'rxjs';
import {catchError, debounceTime, map, startWith, takeUntil, tap} from 'rxjs/operators';
import {AdminActionBaseComponent} from '../../../admin/components/admin-action-base/admin-action-base.component';
import {FormControl} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource, SortDirection} from '@angular/material';
import {DialogService} from '../../../../dialog/dialog.service';
import {getProperty} from './template.pipe';

@Component({
  selector: 'demo-adminify-mat-list-action',
  templateUrl: './adminify-mat-list-action.component.html',
  styleUrls: ['./adminify-mat-list-action.component.scss']
})
export class AdminifyMatListActionComponent extends AdminActionBaseComponent implements OnInit, OnDestroy {

    loading: boolean;
    onDestroy: Subject<void> = new Subject();

    entities: Observable<any[]>;

    inputControl: FormControl;

    actionColumns: string[];

    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(
        admin: Admin,
        action: AdminAction,
        entity: AdminifyEntityService,
        data: RouteData,
        @Inject(RoutePropertySnapshot('action')) actionData: string,
        @Inject(ActionDataProperty('pageSize', 5)) public pageSize: number,
        @Inject(ActionDataProperty('pageSizeOptions', [5, 10, 25, 100])) public pageSizeOptions: number[],
        @Inject(ActionDataProperty('sortActive' )) public sortActive: string,
        @Inject(ActionDataProperty('sortDirection')) public sortDirection: SortDirection,
        @Inject(EntityListConfigsToken) public listConfigs: EntityListConfigs,
        protected dialog: DialogService
    ) {
        super(admin, action, entity);
    }

    ngOnInit() {
        this.inputControl = new FormControl('');
        this.loading = true;
        this.entities = this.entity.getAll({}).pipe(
            tap(() => this.loading = false),
            catchError(err => {
                this.loading = false;
                return throwError(err);
            })
        );

        combineLatest(
            this.inputControl.valueChanges.pipe(startWith(''), debounceTime(300)),
            this.entities
        ).pipe(
            map(([search, entities]) => entities.filter(e => entityContainsString(e, search))),
            takeUntil(this.onDestroy)
        ).subscribe(data => this.dataSource.data = data);

        this.actionColumns = ['viewAction', 'editAction', 'deleteAction'];
        this.displayedColumns = [...this.listConfigs.map(c => c.name), ...this.actionColumns];
        this.dataSource = new MatTableDataSource();
        this.dataSource.sortingDataAccessor = getProperty;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnDestroy(): void {
        this.onDestroy.asObservable();
        this.dialog.closeAll();
    }

    onDelete(row: any) {
        this.dialog.warn('Delete', 'Are you sure ?', 'delete')
            .subscribe(result => {
                if (result) {
                    this.entity.delete(row.id);
                }
            });
    }
}

function entityContainsString(entity: any, search: string): boolean {
    return Object.keys(entity).some(key => entity[key].toString().toLowerCase().includes(search.toLocaleLowerCase()));
}
