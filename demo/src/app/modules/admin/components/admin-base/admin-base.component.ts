import {Component, Inject, OnInit} from '@angular/core';
import {ActionDataProperty, Admin, AdminAction, AdminDataProperty, AdminsDataProperty} from '@ngx-adminify/core';
import {EntityListConfigsToken} from '@ngx-adminify/entity';

@Component({
    selector: 'app-admin-base',
    templateUrl: './admin-base.component.html',
    styleUrls: ['./admin-base.component.scss']
})
export class AdminBaseComponent implements OnInit {

    actions: AdminAction[];

    constructor(public admin: Admin) {
    }

    ngOnInit() {
        this.actions = this.admin.getStaticActions();
    }

}
