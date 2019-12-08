import {Component, Inject, OnInit} from '@angular/core';
import {AdminActionBaseComponent} from '../admin-action-base/admin-action-base.component';
import {AdminAction, Admin} from '@ngx-adminify/core';
import {AdminifyEntityService, EntityViewConfigs, EntityViewConfigsToken} from '@ngx-adminify/entity';
import {RouteData, RouteParam, RoutePropertySnapshot} from '@ngx-adminify/router';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {DialogService} from '../../../../dialog/dialog.service';

@Component({
    selector: 'demo-admin-view-action-base',
    templateUrl: './admin-view-action-base.component.html',
    styleUrls: ['./admin-view-action-base.component.scss']
})
export class AdminViewActionBaseComponent extends AdminActionBaseComponent implements OnInit {

    entityValue: Observable<any>;

    constructor(admin: Admin, action: AdminAction, entity: AdminifyEntityService, data: RouteData,
                @Inject(RoutePropertySnapshot('action')) actionData: string,
                public route: ActivatedRoute,
                @Inject(EntityViewConfigsToken) public viewConfigs: EntityViewConfigs,
                @Inject(RouteParam('id')) public id: Observable<string>,
                protected dialog: DialogService
    ) {
        super(admin, action, entity);
    }

    ngOnInit() {
        this.entityValue = this.id.pipe(switchMap(id => this.entity.get(+id)));
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
