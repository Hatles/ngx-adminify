import {Injectable, Injector} from '@angular/core';
import {Data, Route, Routes} from '@angular/router';
import {Admin} from '../admin';
import {AdminConfig, AdminsConfig} from '../admin-config';
import {AdminifyEmptyOutletComponent, IDataProvider} from '@ngx-adminify/router';
import {AdminFactory, defaultAdminFactory, IAdminFactory} from '../admin-factory';
import {AdminGuard} from '../guards/admin-guard';
import {AdminComponentDictionary} from '../admin-component-dictionary';
import {AdminFactoryDictionary} from '../admin-factory-dictionary';

export interface AdminWithConfig {
    admin: Admin;
    config: AdminConfig;
}

@Injectable({providedIn: 'root'})
export class AdminPoolService implements IDataProvider {

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

        const componentDictionary = injector.get(AdminComponentDictionary);
        const factoryDictionary = injector.get(AdminFactoryDictionary);

        this.processConfig(componentDictionary, factoryDictionary);
        this.resolveGuards(injector);

        const admins = adminsConfig.admins.map((admin) => this.buildAdmin(admin, injector, factoryDictionary));
        const adminRoutes = admins.map(admin => this.buildAdminRoute(admin, componentDictionary));

        return this.wrapWithAdminRouter(this.buildAdminsRoute(adminRoutes));
    }


    private processConfig(componentDictionary: AdminComponentDictionary, factoryDictionary: AdminFactoryDictionary) {
        if (!this.adminsConfig.defaultAdminFactory) {
            this.adminsConfig.defaultAdminFactory = defaultAdminFactory;
        }

        if (!this.adminsConfig.adminGuards) {
            this.adminsConfig.adminGuards = [];
        }

        if (!this.adminsConfig.defaultActionGuards) {
            this.adminsConfig.defaultActionGuards = [];
        }

        if (!this.adminsConfig.adminsData) {
            this.adminsConfig.adminsData = {};
        }

        if (!this.adminsConfig.component && this.adminsConfig.componentName) {
            this.adminsConfig.component = componentDictionary.get(this.adminsConfig.componentName);
        }

        if (!this.adminsConfig.defaultAdminFactory && this.adminsConfig.defaultAdminFactoryName) {
            this.adminsConfig.defaultAdminFactory = factoryDictionary.get(this.adminsConfig.defaultAdminFactoryName);
        }
    }

    private resolveGuards(injector: Injector) {
        this.adminGuards = this.adminsConfig.adminGuards.map(guardToken => injector.get(guardToken)) || [];

    }

    private buildAdmin(config: AdminConfig, injector: Injector, factoryDictionary: AdminFactoryDictionary): Admin {
        let factory: AdminFactory;
        if (config.factory) {
            factory = config.factory;
        } else {
            if (config.factoryName) {
                factory = factoryDictionary.get(config.factoryName);
            } else if (config.factoryToken) {
                factory = injector.get(config.factoryToken);
            } else {
                factory = this.adminsConfig.defaultAdminFactory;
            }
        }

        const admin = typeof factory === 'function' ?
            factory(injector, this, config, this.adminsConfig.defaultAdminName === config.name) :
            (factory as IAdminFactory).build(injector, this, config, this.adminsConfig.defaultAdminName === config.name);

        admin.resolveGuards(injector);
        this.adminsWithConfig.push({
            admin: admin,
            config: config
        });
        this.admins.push(admin);

        return admin;
    }

    private buildAdminRoute(admin: Admin, componentDictionary: AdminComponentDictionary): Route {
        const route = admin.getRoute();

        if (!route.component && admin.config.componentName) {
            route.component = componentDictionary.get(admin.config.componentName);
        }

        return route;
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

    getData(): Data;
    getData<T>(dataName: string, defaultValue?: T): T;
    getData(dataName?: string, defaultValue?: any): any {
        if (!dataName) {
            return this.adminsConfig.adminsData;
        } else {
            const dataValue = this.adminsConfig.adminsData[dataName];
            return dataValue ? dataValue : defaultValue;
        }
    }
}
