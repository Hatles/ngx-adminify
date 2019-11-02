import {Injectable, Injector} from '@angular/core';
import {Route, Routes} from '@angular/router';
import {Admin} from '../admin';
import {AdminConfig, AdminsConfig} from '../admin-config';
import {AdminifyEmptyOutletComponent} from '@ngx-adminify/router';
import {AdminFactory, defaultAdminFactory} from '../admin-factory';
import {AdminGuard} from '../guards/admin-guard';
import {AdminRouteGuard} from '../guards/admin-route-guard';
import {AdminActionRouteGuard} from '../guards/admin-action-route-guard';

export interface AdminWithConfig {
    admin: Admin;
    config: AdminConfig;
}

@Injectable({providedIn: 'root'})
export class AdminPoolService {

    adminsConfig: AdminsConfig;
    adminsWithConfig: AdminWithConfig[];
    admins: Admin[];
    defaultAdmin: Admin;
    adminGuards: AdminGuard[];

    constructor() { }

    buildAdmins(adminsConfig: AdminsConfig, injector: Injector): Routes {
        this.adminsWithConfig = [];
        this.admins = [];
        this.adminsConfig = adminsConfig;

        this.processConfig();
        this.resolveGuards(injector);

        const admins = adminsConfig.admins.map((admin) => this.buildAdmin(admin, injector));
        const adminRoutes = admins.map(admin => this.buildAdminRoute(admin));

        return this.wrapWithAdminRouter(this.buildAdminsRoute(adminRoutes));
    }


    private processConfig() {
        if (!this.adminsConfig.defaultAdminFactory) {
            this.adminsConfig.defaultAdminFactory = defaultAdminFactory;
        }

        if (!this.adminsConfig.adminGuards) {
            this.adminsConfig.adminGuards = [];
        }

        if (!this.adminsConfig.defaultActionGuards) {
            this.adminsConfig.defaultActionGuards = [];
        }
    }

    private resolveGuards(injector: Injector) {
        this.adminGuards = this.adminsConfig.adminGuards.map(guardToken => injector.get(guardToken)) || [];

    }

    private buildAdmin(config: AdminConfig, injector: Injector): Admin {
        let factory: AdminFactory;
        if (config.factory) {
            factory = config.factory;
        } else {
            factory = this.adminsConfig.defaultAdminFactory;
        }
        const admin = factory(this, config, this.adminsConfig.defaultAdminName === config.name);
        admin.resolveGuards(injector);
        this.adminsWithConfig.push({
            admin: admin,
            config: config
        });
        this.admins.push(admin);

        return admin;
    }

    private buildAdminRoute(admin: Admin): Route {
        return admin.getRoute();
    }

    getAdmin(admin: string): Admin {
        return this.getAdminWithConfig(admin).admin;
    }

    getTypedAdmin<T extends Admin>(adminName: string): T {
        const admin = this.getAdminWithConfig(adminName).admin as T;
        if (!admin) {
            throw new Error('Admin with name "' + adminName + '" is not assignable to type //todo');
        }
        return admin as T;
    }

    getAdminConfig(admin: string): AdminConfig {
        return this.getAdminWithConfig(admin).config;
    }

    getAdminWithConfig(admin: string): AdminWithConfig {
        return this.adminsWithConfig.find(a => a.config.name === admin);
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
            this.defaultAdmin = defaultAdmin;
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

    private getAdminRoutesFromConfig(): Route {
        return {
            ...this.adminsConfig,
            data: {
                ...this.adminsConfig.data,
                adminRoot: true
            },
            path: this.adminsConfig.path ? this.adminsConfig.path : ''
        };
    }

    private wrapWithAdminRouter(routes: Routes): Routes {
        return [{
            path: '',
            component: AdminifyEmptyOutletComponent,
            children: routes
        }];
    }

    getAdmins(): Admin[] {
        return this.admins.slice();
    }

    canAccess(adminName: string): boolean {
        const admin = this.getAdmin(adminName);

        for (const adminGuard of this.adminGuards) {
            if (!adminGuard.canAccessAdmin(admin)) {
                return false;
            }
        }

        return admin.canAccess();
    }
}
