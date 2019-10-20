import {IRouterConfigLoaderFactory, RouterConfigLoaderFactory} from '@app/admin/core/routerConfigLoaderFactory';
import {Compiler, Injectable, NgModuleFactoryLoader} from '@angular/core';
import {Route} from '@angular/router/config';
import {AdminRouterConfigLoader} from '@app/admin/core/adminRouterConfigLoader';
import {IRouterConfigLoader} from '@app/admin/core/routerConfigLoader';

@Injectable()
export class AdminRouterConfigLoaderFactory implements IRouterConfigLoaderFactory {

    constructor(private moduleLoader: NgModuleFactoryLoader, private compiler: Compiler) {
    }

    get(onStartLoad?: (r: Route) => void, onEndLoad?: (r: Route) => void): IRouterConfigLoader {
        return new AdminRouterConfigLoader(this.moduleLoader, this.compiler, onStartLoad, onEndLoad);
    }

}
