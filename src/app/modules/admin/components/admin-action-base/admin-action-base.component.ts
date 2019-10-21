import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminPoolService} from '@app/admin/core/admin-pool.service';
import {Admin} from '@app/admin/core/admin';
import {AdminAction} from '@app/admin/core/admin-action';

@Component({
  selector: 'app-admin-action-base',
  templateUrl: './admin-action-base.component.html',
  styleUrls: ['./admin-action-base.component.scss']
})
export class AdminActionBaseComponent implements OnInit {

    constructor(private route: ActivatedRoute, private pool: AdminPoolService, private admin: Admin, private action: AdminAction) { }

    ngOnInit() {
        console.log(this.admin, this.action);
    }

}
