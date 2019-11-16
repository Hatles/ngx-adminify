import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Admin, AdminPoolService, RouteDataSnapshot} from "@ngx-adminify/core";

@Component({
    selector: 'app-admin-root',
    templateUrl: './admin-root.component.html',
    styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit {

    data: any;
    admins: Admin[];

    constructor(public route: ActivatedRoute, public pool: AdminPoolService, data: RouteDataSnapshot) {
        this.data = data.data;
        this.admins = this.pool.getAdmins();
    }

    ngOnInit(): void {
    }

    stringify(data: any) {
        return JSON.stringify(data);
    }
}
