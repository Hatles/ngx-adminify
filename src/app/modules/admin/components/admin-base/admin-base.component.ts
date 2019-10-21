import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminPoolService} from '@app/admin/core/admin-pool.service';
import {Admin} from '@app/admin/core/admin';

@Component({
    selector: 'app-admin-base',
    templateUrl: './admin-base.component.html',
    styleUrls: ['./admin-base.component.scss']
})
export class AdminBaseComponent implements OnInit {

    constructor(private route: ActivatedRoute, private pool: AdminPoolService, private admin: Admin) { }

    ngOnInit() {
        console.log(this.admin);
    }

}
