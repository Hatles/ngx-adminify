import {Component, OnDestroy, OnInit} from '@angular/core';
import {Admin, AdminAction} from '@ngx-adminify/core';
import {ActiveAdminService} from '../../services/active-admin.service';

@Component({
    selector: 'app-admin-base',
    templateUrl: './admin-base.component.html',
    styleUrls: ['./admin-base.component.scss']
})
export class AdminBaseComponent implements OnInit, OnDestroy {

    actions: AdminAction[];

    constructor(
        public activeAdmin: ActiveAdminService,
        public admin: Admin) {
    }

    ngOnInit(): void {
        this.activeAdmin.setActive(this.admin);
        this.actions = this.admin.getStaticActions();
    }

    ngOnDestroy(): void {
        this.activeAdmin.quit();
    }

}
