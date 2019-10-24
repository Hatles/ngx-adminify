import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminPoolService, RouteData} from "@ngx-adminify/core";

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
