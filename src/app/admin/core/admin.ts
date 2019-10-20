import {Route} from '@angular/router';
import {AdminPoolService} from './admin-pool.service';
import {AdminConfig} from './admin-config';

export class Admin {
    constructor(private pool: AdminPoolService, public config: AdminConfig) {
        this.name = this.config.name;
    }

    name: string;
    route: Route;

    private buildRoute() {
        this.route = {
            ...this.config,
            path: this.config.path || this.config.path === '' ? this.config.path : this.config.name
        };

        if (!this.route.children) {
            this.route.children = [];
        }

        if (this.config.actions) {
            this.route.children = [
                ...this.config.actions,
                ...this.route.children
            ];
        }
    }

    getRoute(): Route {
        if (!this.route) {
            this.buildRoute();
        }

        return this.route;
    }

    getAbsoluteUrl(): string {
        return this.pool.getAbsoluteRootUrl() + '/' + this.getUrl();
    }

    getUrl(): string {
        return this.route.path;
    }
}
