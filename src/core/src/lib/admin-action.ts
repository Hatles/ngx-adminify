import {AdminActionConfig} from './admin-action-config';
import {AdminRouteBuilder, RouteParametersValues} from './services/admin-route-builder';
import {Admin} from './admin';
import {Route} from '@angular/router';

export class AdminAction {

    name: string;
    routeBuilder: AdminRouteBuilder;
    route: Route;

    constructor(private admin: Admin, public config: AdminActionConfig) {
        this.name = this.config.name;

        this.route = {
            ...this.config,
            data: {
                ...this.config.data,
                action: this.name
            },
            path: this.config.path || this.config.path === '' ? this.config.path : this.config.name
        };

        if (!this.route.canActivate) {
            this.route.canActivate = this.admin.config.defaultActionRouteGuards || [];
        }

        this.routeBuilder = new AdminRouteBuilder(this.route.path);
    }

    getUrl(...parameters: string[]): string[];

    getUrl(parameters?: string[] | RouteParametersValues): string[];

    getUrl(parameters?: any): string[] {
        return this.routeBuilder.getUrl(parameters);
    }

    getAdminRelativeUrl(...parameters: string[]): string[];

    getAdminRelativeUrl(parameters?: string[] | RouteParametersValues): string[];

    getAdminRelativeUrl(parameters?: any): string[] {
        return [...this.admin.getUrl(), ...this.getUrl()];
    }

    getCompiledUrl(...parameters: string[]): string;

    getCompiledUrl(parameters?: string[] | RouteParametersValues): string;

    getCompiledUrl(parameters?: any): string {
        return this.getUrl(parameters).join('/');
    }

    getRoute() {
        return this.route;
    }
}
