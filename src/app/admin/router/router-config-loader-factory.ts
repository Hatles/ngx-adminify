import {RouterConfigLoader} from '@angular/router/router_config_loader';
import {Route} from '@angular/router/config';
import {IRouterConfigLoader} from '@app/admin/router/router-config-loader';
import {Compiler, Injectable, NgModuleFactoryLoader} from '@angular/core';

export interface IRouterConfigLoaderFactory {
    get(onLoadStartListener?: (r: Route) => void, onLoadEndListener?: (r: Route) => void): IRouterConfigLoader | RouterConfigLoader;
}

@Injectable()
export class RouterConfigLoaderFactory implements IRouterConfigLoaderFactory {

    constructor(private moduleLoader: NgModuleFactoryLoader, private compiler: Compiler) {
    }

    get(onStartLoad?: (r: Route) => void, onEndLoad?: (r: Route) => void): RouterConfigLoader {
        return new RouterConfigLoader(this.moduleLoader, this.compiler, onStartLoad, onEndLoad);
    }

}
