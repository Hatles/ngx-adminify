import {Component, Inject, OnInit} from '@angular/core';
import {Admin, AdminAction, RouteData, RoutePropertySnapshot, RoutePropertySnapshotToken} from '@ngx-adminify/core';
import {AdminifyEntityService} from '@ngx-adminify/entity';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-admin-action-base',
  templateUrl: './admin-action-base.component.html',
  styleUrls: ['./admin-action-base.component.scss']
})
export class AdminActionBaseComponent implements OnInit {

    entities: Observable<{value: any, string: string}[]>;
    dataS: Observable<any>;
    creating: boolean;

    constructor(public admin: Admin, public action: AdminAction, public entity: AdminifyEntityService, public data: RouteData, @Inject(RoutePropertySnapshot('action')) public actionData: string) { }

    ngOnInit() {
        this.entities = this.entity.getAll({}).pipe(map(es => es.map(e => ({value: e, string: JSON.stringify(e)}))));
        this.dataS = this.data.data.pipe(map(d => JSON.stringify(d)));
    }

    create() {
        this.creating = true;
        const id = Math.floor(Math.random() * 1000);
        this.entity.create({id: id, data: 'test ' + id}).subscribe(() => this.creating = false);
    }
}
