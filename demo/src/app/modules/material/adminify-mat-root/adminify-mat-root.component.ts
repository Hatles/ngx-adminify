import {Component, OnInit} from '@angular/core';
import {AdminRootComponent} from '../../admin/components/admin-root/admin-root.component';
import {ActivatedRoute} from '@angular/router';
import {AdminPoolService} from '@ngx-adminify/core';
import {RouteDataSnapshot} from '@ngx-adminify/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

export interface MenuItem {
    path: string | any[];
    title: string;
    links?: MenuItem[];
}

export type Menu = MenuItem[];

@Component({
    selector: 'adminify-mat-root',
    templateUrl: './adminify-mat-root.component.html',
    styleUrls: ['./adminify-mat-root.component.scss']
})
export class AdminifyMatRootComponent extends AdminRootComponent implements OnInit {
    isSmallDevice$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
        map(result => result.matches),
    );

    menu: Menu;

    constructor(route: ActivatedRoute, pool: AdminPoolService, data: RouteDataSnapshot,
                private breakpointObserver: BreakpointObserver) {
        super(route, pool, data);
    }

    ngOnInit() {
        super.ngOnInit();

        this.menu = this.pool.getAdmins().map(admin => ({
                path: admin.getUrl(),
                title: admin.name,
                links: admin.getStaticActions().map(action => ({
                    path: action.getAdminRelativeUrl(),
                    title: action.name,
                }))
            })
        );
    }

}
