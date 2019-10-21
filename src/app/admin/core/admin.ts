import {Route} from '@angular/router';
import {AdminPoolService} from './admin-pool.service';
import {AdminConfig} from './admin-config';
import {AdminRouteBuilder, RouteParametersValues} from '@app/admin/core/admin-route-builder';
import {AdminAction} from '@app/admin/core/admin-action';

export class Admin {
    constructor(private pool: AdminPoolService, public config: AdminConfig) {
        this.name = this.config.name;
    }

    name: string;
    segment: string;
    parameters: string[];
    route: Route;
    routeBuilder: AdminRouteBuilder;
    actions: AdminAction[];

    private buildRoute() {
        this.route = {
            ...this.config,
            data: {
                ...this.config.data,
                admin: this.name
            },
            path: this.config.path || this.config.path === '' ? this.config.path : this.config.name
        };

        if (!this.route.children) {
            this.route.children = [];
        }

        if (this.config.actions) {
            this.route.children = [
                ...this.buildActions().map(a => a.route),
                ...this.route.children
            ];
        }

        this.buildRouteSegment(this.route.path);
    }

    private buildActions(): AdminAction[] {
        this.actions = this.config.actions.map(a => new AdminAction(this, a));
        return this.actions;
    }

    getRoute(): Route {
        if (!this.route) {
            this.buildRoute();
        }

        return this.route;
    }

    private buildRouteSegment(path: string) {
        this.routeBuilder = new AdminRouteBuilder(path);
    }

    getAction(action: string): AdminAction {
        return this.actions.find(a => a.name === action);
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

    getActionUrl(action: string, ...parameters: string[]): string[];

    getActionUrl(action: string, parameters?: string[] | RouteParametersValues): string[];

    getActionUrl(action: string, parameters?: any): string[] {
        return [...this.getUrl(), ...this.getAction(action).getUrl(parameters)];
    }
}
