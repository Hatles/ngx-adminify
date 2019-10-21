import {Injectable, Injector} from '@angular/core';
import {Route, Router, Routes} from '@angular/router';
import {Admin} from './admin';
import {AdminConfig, AdminsConfig} from './admin-config';
import {RouteWithAbsoluteUrl, RouteWithParent, routeWithParentToUrl} from './route-utils';
import {removePreFix} from './remove-pre-fix';
import {Subject} from 'rxjs';
import {AdminEmptyOutletComponent} from '@app/admin/router/components/adminify-empty-outlet.service';

export interface AdminWithConfig {
    admin: Admin;
    config: AdminConfig;
}

@Injectable({providedIn: 'root'})
export class AdminPoolService {

    private adminsConfig: AdminsConfig;
    private admins: AdminWithConfig[];
    private rootRoute: RouteWithAbsoluteUrl;

    logRoute: Subject<any> = new Subject<any>();

    constructor() { }

    buildAdmins(adminsConfig: AdminsConfig): Routes {
        this.admins = [];
        this.adminsConfig = adminsConfig;
        const admins = adminsConfig.admins.map((admin) => this.buildAdmin(admin));
        const adminRoutes = admins.map(admin => this.buildAdminRoute(admin));

        return this.wrapWithAdminRouter(this.buildAdminsRoute(adminRoutes));
    }

    private buildAdmin(config: AdminConfig): Admin {
        const admin = new Admin(this, config);
        this.admins.push({
            admin: admin,
            config: config
        });

        return admin;
    }

    private buildAdminRoute(admin: Admin): Route {
        return admin.getRoute();
    }

    getAdmin(admin: string): Admin {
        return this.getAdminWithConfig(admin).admin;
    }

    getAdminConfig(admin: string): AdminConfig {
        return this.getAdminWithConfig(admin).config;
    }

    getAdminWithConfig(admin: string): AdminWithConfig {
        return this.admins.find(a => a.config.name === admin);
    }

    private buildAdminsRoute(adminRoutes: Route[]): Routes {
        const route = this.getAdminRoutesFromConfig();

        if (!route.children) {
            route.children = [];
        }

        // Add admins routes
        route.children = [...adminRoutes, ...route.children];

        // Add default admin redirect
        if (this.adminsConfig.defaultAdminName) {
            const defaultAdmin = this.getAdmin(this.adminsConfig.defaultAdminName);
            const defaultAdminUrl = defaultAdmin.getCompiledUrl();

            if (defaultAdminUrl !== '') {
                route.children = [
                    ...route.children,
                    {
                        path: '',
                        redirectTo: defaultAdmin.getRoute().path,
                        pathMatch: 'full'
                    }
                ];
            }
        }

        // Add redirect to admin root
        if (route.path !== '') {
            return [
                route,
                {
                    path: '',
                    redirectTo: route.path,
                    pathMatch: 'full'
                }
            ];
        }

        return [route];
    }

    private getRootRoute(routes: Routes): RouteWithAbsoluteUrl {
        const routesQueue: RouteWithParent[] = [...routes.map(r => ({route: r, parent: null}))];

        if (this.adminsConfig.rootFinder) {
            while (routesQueue.length) {
                const route = routesQueue.shift();
                if (this.adminsConfig.rootFinder(route)) {
                    return routeWithParentToUrl(route);
                } else if (route.route.children) {
                    routesQueue.push(...route.route.children.map(r => ({route: r, parent: route})));
                }
            }
        }

        return null;
    }

    private getAdminRoutesFromConfig(): Route {
        return {
            ...this.adminsConfig,
            path: this.adminsConfig.path ? this.adminsConfig.path : ''
        };
    }

    private generateDefaultRootRoute(): RouteWithAbsoluteUrl {
        const defaultRoute = this.adminsConfig.defaultRoute ?
            this.adminsConfig.defaultRoute :
            {
                path: typeof this.adminsConfig.defaultRoutePath === 'string' &&
                this.adminsConfig.defaultRoutePath !== '' ?
                    this.adminsConfig.defaultRoutePath :
                    'admin',
                component: AdminEmptyOutletComponent
            };

        return {
            route: defaultRoute,
            url: '/' + removePreFix(defaultRoute.path, '/')
        };
    }

    getAbsoluteRootUrl(): string {
        return this.rootRoute.url;
    }

    private wrapWithAdminRouter(routes: Routes): Routes {
        return [{
            path: '',
            component: AdminEmptyOutletComponent,
            children: routes
        }];
    }
}
