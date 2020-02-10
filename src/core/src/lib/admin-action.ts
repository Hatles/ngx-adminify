import {AdminActionConfig} from './admin-action-config';
import {AdminRouteBuilder, RouteParametersValues} from './services/admin-route-builder';
import {Admin} from './admin';
import {Data, Route} from '@angular/router';
import {IDataProvider} from '@ngx-adminify/router';
import {AdminComponentDictionary} from './admin-component-dictionary';

export class AdminAction implements IDataProvider {

    name: string;
    routeBuilder: AdminRouteBuilder;
    route: Route;
    hasParameters: boolean;

    constructor(private admin: Admin, protected componentDictionary: AdminComponentDictionary, public config: AdminActionConfig) {
        this.name = this.config.name;

        this.processConfig();
        this.buildRoute();
    }

    private processConfig() {
        if (!this.config.actionData) {
            this.config.actionData = {};
        }

        if (!this.config.component && this.config.componentName) {
            this.config.component = this.componentDictionary.get(this.config.componentName);
        }
    }

    protected buildRoute() {
        this.route = {
            ...this.config,
            data: {
                ...this.config.data,
                action: this.name,
                actionAdmin: this.admin.name
            },
            path: this.config.path || this.config.path === '' ? this.config.path : this.config.name
        };

        if (!this.route.canActivate) {
            this.route.canActivate = this.admin.config.defaultActionRouteGuards || [];
        }

        this.routeBuilder = new AdminRouteBuilder(this.route.path);
        this.hasParameters = this.routeBuilder.hasParameters();
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

    getData(): Data;
    getData<T>(dataName: string, defaultValue?: T): T;
    getData(dataName?: string, defaultValue?: any): any {
        if (!dataName) {
            return this.config.actionData;
        } else {
            const dataValue = this.config.actionData[dataName];
            return dataValue ? dataValue : defaultValue;
        }
    }
}
