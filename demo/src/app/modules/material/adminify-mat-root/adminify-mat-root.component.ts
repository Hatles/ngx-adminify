import {Component} from '@angular/core';
import {AdminRootComponent} from "../../admin/components/admin-root/admin-root.component";
import {ActivatedRoute} from "@angular/router";
import {AdminPoolService, RouteData} from "@ngx-adminify/core";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";

@Component({
    selector: 'demo-adminify-mat-root',
    templateUrl: './adminify-mat-root.component.html',
    styleUrls: ['./adminify-mat-root.component.scss']
})
export class AdminifyMatRootComponent extends AdminRootComponent {
    isSmallDevice$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
        map(result => result.matches),
    );

    menu = [];

    constructor(route: ActivatedRoute, pool: AdminPoolService, data: RouteData,
                private breakpointObserver: BreakpointObserver) {
        super(route, pool, data);
    }

    ngOnInit() {
        super.ngOnInit();
    }

}
