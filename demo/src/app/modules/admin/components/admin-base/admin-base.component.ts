import {Component, OnInit} from '@angular/core';
import {Admin} from '@app/../../../../../../../src/core/admin';
import {AdminAction} from '@app/../../../../../../../src/core/admin-action';

@Component({
    selector: 'app-admin-base',
    templateUrl: './admin-base.component.html',
    styleUrls: ['./admin-base.component.scss']
})
export class AdminBaseComponent implements OnInit {

    actions: AdminAction[];

    constructor(private admin: Admin) { }

    ngOnInit() {
        this.actions = this.admin.getAllActions();
    }

}
