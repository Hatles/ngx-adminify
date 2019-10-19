import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminPoolService} from '../../../../admin/core/admin-pool.service';

@Component({
  selector: 'app-admin-action-base',
  templateUrl: './admin-action-base.component.html',
  styleUrls: ['./admin-action-base.component.scss']
})
export class AdminActionBaseComponent implements OnInit {

    constructor(private route: ActivatedRoute, private pool: AdminPoolService) {
    }

    ngOnInit() {
        this.pool.logRoute.subscribe(() => console.log('action', this.route.snapshot));
    }

}
