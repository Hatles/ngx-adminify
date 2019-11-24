import {Component, Inject, OnInit} from '@angular/core';
import {ActionDataProperty, Admin, AdminDataProperty, AdminPoolService, AdminsDataProperty} from '@ngx-adminify/core';

@Component({
    selector: 'app-admin-dashboard-base',
    templateUrl: './admin-dashboard-base.component.html',
    styleUrls: ['./admin-dashboard-base.component.scss']
})
export class AdminDashboardBaseComponent implements OnInit {

    admins: Admin[];

    constructor(private pool: AdminPoolService, public admin: Admin,
    ) {
        console.log('admin', admin);
    }

    ngOnInit() {
        this.admins = this.pool.getAdmins();
    }

}
