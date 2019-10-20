import {Injectable, Injector} from '@angular/core';
import {Route, Router, Routes} from '@angular/router';
import {Admin} from './admin';
import {AdminConfig, AdminsConfig} from './adminConfig';
import {RouteWithAbsoluteUrl, RouteWithParent, routeWithParentToUrl} from './routeUtils';
import {removePostFix} from './removePostFix';
import {removePreFix} from './removePreFix';
import {Subject} from 'rxjs';
import {AdminEmptyOutletComponent} from '@app/admin/core/components/admin-empty-outlet.service';

export interface AdminWithConfig {
    admin: Admin;
    config: AdminConfig;
}

@Injectable({providedIn: 'root'})
export class AdminPoolService {

    private adminsConfig: AdminsConfig;
    private admins: AdminWithConfig[];
    private router: Router;
    private rootRoute: RouteWithAbsoluteUrl;

    logRoute: Subject<any> = new Subject<any>();

    constructor(private injector: Injector) {
    }

    buildAdmins(router: Router, adminsConfig: AdminsConfig) {
        this.router = router;
        this.admins = [];
        this.adminsConfig = adminsConfig;
        const admins = adminsConfig.admins.map((admin) => this.buildAdmin(admin));
        const adminRoutes = admins.map(admin => this.buildAdminRoute(admin));

        this.buildAdminsRoute(adminRoutes);
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

    private buildAdminsRoute(adminRoutes: Route[]) {
        const route = this.getAdminRoutesFromConfig();

        if (!route.children) {
            route.children = [];
        }

        // Add admins routes
        route.children = [...adminRoutes, ...route.children];

        if (!this.router) {
            this.router = this.injector.get(Router);
        }

        const routerConfig = [...this.router.config];

        let root = this.getRootRoute(routerConfig);
        if (!root) {
            root = this.generateDefaultRootRoute();

            routerConfig.unshift(root.route);

            if (route.path !== '') {

                if (!root.route.children) {
                    root.route.children = [];
                }

                root.route.children.unshift({
                    path: '',
                    redirectTo: removePostFix(root.url, '/') + '/' + removePreFix(route.path, '/'),
                    pathMatch: 'full'
                });
            }

            root.route.children.push({
                path: '**',
                redirectTo: removePostFix(root.url, '/') + '/' + removePreFix(route.path, '/'),
            });
        }
        if (!root.route.children) {
            root.route.children = [];
        }
        if (route.path !== '') {

            root.url = removePostFix(root.url, '/') + '/' + removePreFix(route.path, '/');
        }
        this.rootRoute = root;

        // Add default admin redirect
        if (this.adminsConfig.defaultAdminName) {
            const defaultAdmin = this.getAdmin(this.adminsConfig.defaultAdminName);
            const defaultAdminUrl = defaultAdmin.getUrl();

            if (defaultAdminUrl !== '') {
                route.children = [...route.children, {
                    path: '', redirectTo: defaultAdmin.getAbsoluteUrl(), pathMatch: 'full'
                }];
            }
        }

        // Add wildcard route
        if (this.adminsConfig.wildcardRoute) {
            route.children = [...route.children, {...this.adminsConfig.wildcardRoute, path: '**'}];
        } else if (this.adminsConfig.wildcardRedirectToAdminRoot) {
            route.children = [...route.children, { path: '**', redirectTo: this.getAbsoluteRootUrl() }];
        } else if (this.adminsConfig.wildcardRedirectToDefaultAdmin) {
            const defaultAdmin = this.getAdmin(this.adminsConfig.defaultAdminName);
            const defaultAdminUrl = defaultAdmin.getUrl();

            if (defaultAdminUrl !== '') {
                route.children = [...route.children, { path: '**', redirectTo: defaultAdmin.getAbsoluteUrl() }];
            }
        }

        // Add admin route
        root.route.children.unshift(route);

        this.router.resetConfig(routerConfig);
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
        return this.adminsConfig;
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
}
