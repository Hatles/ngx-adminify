import { Component, OnInit } from '@angular/core';
import {AdminPoolService} from '@app/../../../../../../../src/core/admin-pool.service';
import {Admin} from '@app/../../../../../../../src/core/admin';

@Component({
  selector: 'app-admin-dashboard-base',
  templateUrl: './admin-dashboard-base.component.html',
  styleUrls: ['./admin-dashboard-base.component.scss']
})
export class AdminDashboardBaseComponent implements OnInit {

    admins: Admin[];

  constructor(private pool: AdminPoolService) { }

  ngOnInit() {
      this.admins = this.pool.getAllAdmin();
  }

}
