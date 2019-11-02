import {Component, OnInit} from '@angular/core';
import {Admin, AdminAction} from "@ngx-adminify/core";

@Component({
    selector: 'app-admin-base',
    templateUrl: './admin-base.component.html',
    styleUrls: ['./admin-base.component.scss']
})
export class AdminBaseComponent implements OnInit {

    actions: AdminAction[];

    constructor(public admin: Admin) { }

    ngOnInit() {
        this.actions = this.admin.getStaticActions();
    }

}
