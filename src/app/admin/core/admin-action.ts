import {AdminPoolService} from '@app/admin/core/admin-pool.service';
import {AdminActionConfig} from '@app/admin/core/admin-action-config';
import {AdminRouteBuilder, RouteParametersValues} from '@app/admin/core/admin-route-builder';
import {Admin} from '@app/admin/core/admin';
import {Route} from '@angular/router';

export class AdminAction {

    name: string;
    routeBuilder: AdminRouteBuilder;
    route: Route;

    constructor(private admin: Admin, public config: AdminActionConfig) {
        this.name = this.config.name;

        this.route = {
            ...this.config,
            path: this.config.path || this.config.path === '' ? this.config.path : this.config.name
        };

        this.routeBuilder = new AdminRouteBuilder(this.route.path);
    }

    getUrl(...parameters: string[]): string[];

    getUrl(parameters?: string[] | RouteParametersValues): string[];

    getUrl(parameters?: any): string[] {
        return this.routeBuilder.getUrl(parameters);
    }

    getCompiledUrl(...parameters: string[]): string;

    getCompiledUrl(parameters?: string[] | RouteParametersValues): string;

    getCompiledUrl(parameters?: any): string {
        return this.getUrl(parameters).join('/');
    }
}
