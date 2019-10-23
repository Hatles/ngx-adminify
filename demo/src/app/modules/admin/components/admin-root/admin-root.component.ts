import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminPoolService} from '@app/../../../../../../../src/core/admin-pool.service';
import {RouteData} from '@app/../../../../../../../src/core/route-data';

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

}
