import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminPoolService} from '../../../../admin/core/admin-pool.service';
import {RouteData} from '@app/admin/core/adminify.module';

@Component({
    selector: 'app-admin-root',
    templateUrl: './admin-root.component.html',
    styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit {

    dataStr: string;

    constructor(private route: ActivatedRoute, private pool: AdminPoolService, public data: RouteData) {
        this.dataStr = JSON.stringify(this.data.data);
    }

    ngOnInit(): void {
    }

    onLogRoute() {
        this.pool.logRoute.next();
    }

}
