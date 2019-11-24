import {Component, Inject, OnInit} from '@angular/core';
import {AdminActionBaseComponent} from '../admin-action-base/admin-action-base.component';
import {AdminAction, Admin} from '@ngx-adminify/core';
import {AdminifyEntityService} from '@ngx-adminify/entity';
import {RouteData, RoutePropertySnapshot} from '@ngx-adminify/router';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';

@Component({
    selector: 'demo-admin-view-action-base',
    templateUrl: './admin-view-action-base.component.html',
    styleUrls: ['./admin-view-action-base.component.scss']
})
export class AdminViewActionBaseComponent extends AdminActionBaseComponent implements OnInit {

    id: any;
    idS: Observable<any>;
    entityValue: Observable<any>;

    constructor(admin: Admin, action: AdminAction, entity: AdminifyEntityService, data: RouteData,
                @Inject(RoutePropertySnapshot('action')) actionData: string,
                public route: ActivatedRoute) {
        super(admin, action, entity, data, actionData);
    }

    ngOnInit() {
        super.ngOnInit();

        this.id = this.route.snapshot.params.id;
        this.idS = this.route.params.pipe(map(p => p.id));

        this.entityValue = this.idS.pipe(switchMap(id => this.entity.get(id)), map(e => JSON.stringify(e)));
    }

}
