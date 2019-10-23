import {Route, RouterConfigLoader} from '@angular/router';
import {Compiler, Injectable, NgModuleFactoryLoader} from '@angular/core';
import {IRouterConfigLoader} from './router-config-loader';

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
