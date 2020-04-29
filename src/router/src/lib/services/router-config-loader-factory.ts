import {Compiler, Injectable, NgModuleFactoryLoader} from '@angular/core';
import {IRouterConfigLoader} from './router-config-loader';
import {RouterConfigLoader} from "../angular/router/router_config_loader";
import {Route} from "../angular/router/config";

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
