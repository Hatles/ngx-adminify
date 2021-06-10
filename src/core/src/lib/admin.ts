import {Data, Route} from '@angular/router';
import {AdminPoolService} from './services/admin-pool-service';
import {AdminConfig} from './admin-config';
import {AdminRouteBuilder, RouteParametersValues} from './services/admin-route-builder';
import {AdminAction} from './admin-action';
import {Injector} from '@angular/core';
import {AdminActionGuard} from './guards/admin-action-guard';
import {AdminGuard} from './guards/admin-guard';
import {AdminComponentDictionary} from './admin-component-dictionary';
import {IDataProvider} from './data/data-provider';

export class Admin implements IDataProvider {

    name: string;
    segment: string;
    parameters: string[];
    route: Route;
    routeBuilder: AdminRouteBuilder;
    actions: AdminAction[] = [];
    defaultAction: AdminAction;
    adminGuards: AdminGuard[];
    actionGuards: AdminActionGuard[];

    constructor(
        protected pool: AdminPoolService,
        protected componentDictionary: AdminComponentDictionary,
        public config: AdminConfig,
        public defaultAdmin: boolean = false
    ) {
        this.name = this.config.name;

        this.processConfig();
    }

    private processConfig() {
        if (!this.config.defaultActionRouteGuards) {
            this.config.defaultActionRouteGuards = this.pool.adminsConfig.defaultActionRouteGuards || [];
        }

        if (!this.config.adminGuards) {
            this.config.adminGuards = [];
        }

        if (!this.config.actionGuards) {
            this.config.actionGuards = this.pool.adminsConfig.defaultActionGuards || [];
        }

        if (!this.config.adminData) {
            this.config.adminData = {};
        }

        if (!this.config.component && this.config.componentName) {
            this.config.component = this.componentDictionary.get(this.config.componentName);
        }
    }

    resolveGuards(injector: Injector) {
        this.adminGuards = this.config.adminGuards.map(guardToken => injector.get(guardToken)) || [];
        this.actionGuards = this.config.actionGuards.map(guardToken => injector.get(guardToken)) || [];
    }

    protected buildRoute() {
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

        if (!this.route.canActivate) {
            this.route.canActivate = this.pool.adminsConfig.defaultAdminRouteGuards || [];
        }

        if (this.config.actions) {
            this.route.children = [
                ...this.buildActions().map(a => a.route),
                ...this.route.children
            ];
        }

        if (this.config.defaultActionName) {
            const defaultAction = this.getAction(this.config.defaultActionName);
            this.defaultAction = defaultAction;
            const defaultActionUrl = defaultAction.getCompiledUrl();

            if (defaultActionUrl !== '') {
                this.route.children = [
                    ...this.route.children,
                    {
                        path: '',
                        redirectTo: defaultAction.getRoute().path,
                        pathMatch: 'full'
                    }
                ];
            }
        }

        this.buildRouteSegment(this.route.path);
    }

    private buildActions(): AdminAction[] {
        this.actions = this.config.actions.map(a => new AdminAction(this, this.componentDictionary, a));
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
        return this.getAction(action).getAdminRelativeUrl(parameters);
    }

    getActionTrueUrl(action: string, ...parameters: string[]): string[];

    getActionTrueUrl(action: string, parameters?: string[] | RouteParametersValues): string[];

    getActionTrueUrl(action: string, parameters?: any): string[] {
        return this.getAction(action).getUrl(parameters);
    }

    getActions(): AdminAction[] {
        return this.actions.slice();
    }

    // routes without parameters
    getStaticActions(): AdminAction[] {
        return this.actions.filter(a => !a.hasParameters);
    }

    canAccessAction(actionName: string): boolean {
        const action = this.getAction(actionName);

        for (const actionGuard of this.actionGuards) {
            if (!actionGuard.canAccessAction(this, action, actionName)) {
                return false;
            }
        }

        return true;
    }

    canAccess(): boolean {

        for (const adminGuard of this.adminGuards) {
            if (!adminGuard.canAccessAdmin(this)) {
                return false;
            }
        }

        return true;
    }

    getData(): Data;
    getData<T>(dataName: string, defaultValue?: T): T;
    getData(dataName?: string, defaultValue?: any): any {
        if (!dataName) {
            return this.config.adminData;
        } else {
            const dataValue = this.config.adminData[dataName];
            return dataValue ? dataValue : defaultValue;
        }
    }
}
