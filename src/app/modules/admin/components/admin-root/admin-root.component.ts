import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminPoolService} from '../../../../admin/core/admin-pool.service';

@Component({
    selector: 'app-admin-root',
    templateUrl: './admin-root.component.html',
    styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit {

    constructor(private route: ActivatedRoute, private pool: AdminPoolService) {
    }

    ngOnInit(): void {
    }

    onLogRoute() {
        this.pool.logRoute.next();
    }

}
