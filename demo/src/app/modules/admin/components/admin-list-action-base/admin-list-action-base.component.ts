import {Component, Inject, OnInit} from '@angular/core';
import {AdminActionBaseComponent} from '../admin-action-base/admin-action-base.component';
import {Admin, AdminAction} from '@ngx-adminify/core';
import {AdminifyEntityService, EntityListConfigs, EntityListConfigsToken} from '@ngx-adminify/entity';
import {RouteData, RoutePropertySnapshot} from '@ngx-adminify/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export const RouteAction = RoutePropertySnapshot('action');

@Component({
  selector: 'demo-admin-list-action-base',
  templateUrl: './admin-list-action-base.component.html',
  styleUrls: ['./admin-list-action-base.component.scss']
})
export class AdminListActionBaseComponent extends AdminActionBaseComponent implements OnInit {

    entities: Observable<any[]>;

    constructor(
        admin: Admin,
        action: AdminAction,
        entity: AdminifyEntityService,
        @Inject(EntityListConfigsToken) public listConfigs: EntityListConfigs) {
        super(admin, action, entity);
    }

    ngOnInit() {
        this.entities = this.entity.getAll({}).pipe(map(es => es.map(e => ({value: e, string: JSON.stringify(e)}))));
    }

}
