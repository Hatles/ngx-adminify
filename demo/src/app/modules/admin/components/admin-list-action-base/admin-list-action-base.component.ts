import {Component, Inject, OnInit} from '@angular/core';
import {AdminActionBaseComponent} from '../admin-action-base/admin-action-base.component';
import {Admin, AdminAction} from '@ngx-adminify/core';
import {AdminifyEntityService, EntityListConfigs, EntityListConfigsToken} from '@ngx-adminify/entity';
import {RouteData, RoutePropertySnapshot} from '@ngx-adminify/router';
@Component({
  selector: 'demo-admin-list-action-base',
  templateUrl: './admin-list-action-base.component.html',
  styleUrls: ['./admin-list-action-base.component.scss']
})
export class AdminListActionBaseComponent extends AdminActionBaseComponent implements OnInit {


    constructor(
        admin: Admin,
        action: AdminAction,
        entity: AdminifyEntityService,
        data: RouteData,
        @Inject(RoutePropertySnapshot('action')) actionData: string,
        @Inject(EntityListConfigsToken) public listConfigs: EntityListConfigs) {
        super(admin, action, entity, data, actionData);
    }

    ngOnInit() {
        super.ngOnInit();
    }

}
