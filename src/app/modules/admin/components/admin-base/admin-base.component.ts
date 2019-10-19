import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminPoolService} from '../../../../admin/core/admin-pool.service';

@Component({
    selector: 'app-admin-base',
    templateUrl: './admin-base.component.html',
    styleUrls: ['./admin-base.component.scss']
})
export class AdminBaseComponent implements OnInit {

    constructor(private route: ActivatedRoute, private pool: AdminPoolService) {
    }

    ngOnInit() {
        this.pool.logRoute.subscribe(() => console.log('admin', this.route));
    }

}
