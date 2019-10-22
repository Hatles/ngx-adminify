import {Component, OnInit} from '@angular/core';
import {Admin} from '@app/admin/core/admin';
import {AdminAction} from '@app/admin/core/admin-action';

@Component({
  selector: 'app-admin-action-base',
  templateUrl: './admin-action-base.component.html',
  styleUrls: ['./admin-action-base.component.scss']
})
export class AdminActionBaseComponent implements OnInit {

    constructor(private admin: Admin, private action: AdminAction) { }

    ngOnInit() {
        console.log(this.admin, this.action);
    }

}
