import {Component, OnInit} from '@angular/core';
import {Admin, AdminPoolService} from "@ngx-adminify/core";

@Component({
    selector: 'app-admin-dashboard-base',
    templateUrl: './admin-dashboard-base.component.html',
    styleUrls: ['./admin-dashboard-base.component.scss']
})
export class AdminDashboardBaseComponent implements OnInit {

    admins: Admin[];

    constructor(private pool: AdminPoolService) {
    }

    ngOnInit() {
        this.admins = this.pool.getAdmins();
    }

}
