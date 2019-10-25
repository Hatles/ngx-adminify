import {Component, OnInit} from '@angular/core';
import {Admin, AdminAction} from "@ngx-adminify/core";

@Component({
  selector: 'app-admin-action-base',
  templateUrl: './admin-action-base.component.html',
  styleUrls: ['./admin-action-base.component.scss']
})
export class AdminActionBaseComponent implements OnInit {

    constructor(public admin: Admin, public action: AdminAction) { }

    ngOnInit() {

    }

}
