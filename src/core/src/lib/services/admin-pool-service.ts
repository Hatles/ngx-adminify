import {Injectable} from '@angular/core';
import {Route, Routes} from '@angular/router';
import {Admin} from '../admin';
import {AdminConfig, AdminsConfig} from '../admin-config';
import {AdminifyEmptyOutletComponent} from '@ngx-adminify/router';

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

    constructor() { }

    buildAdmins(adminsConfig: AdminsConfig): Routes {
        this.adminsWithConfig = [];
        this.admins = [];
        this.adminsConfig = adminsConfig;
        const admins = adminsConfig.admins.map((admin) => this.buildAdmin(admin));
        const adminRoutes = admins.map(admin => this.buildAdminRoute(admin));

        return this.wrapWithAdminRouter(this.buildAdminsRoute(adminRoutes));
    }

    private buildAdmin(config: AdminConfig): Admin {
        const admin = new Admin(this, config, this.adminsConfig.defaultAdminName === config.name);
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
}
