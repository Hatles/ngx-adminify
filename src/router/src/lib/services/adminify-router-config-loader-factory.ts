import {Compiler, Injectable, NgModuleFactoryLoader} from '@angular/core';
import {Route} from '../angular/router';
import {IRouterConfigLoaderFactory} from "./router-config-loader-factory";
import {IRouterConfigLoader} from "./router-config-loader";
import {AdminifyRouterConfigLoader} from "./adminify-router-config-loader";

@Injectable()
export class AdminifyRouterConfigLoaderFactory implements IRouterConfigLoaderFactory {

    constructor(private moduleLoader: NgModuleFactoryLoader, private compiler: Compiler) {
    }

    get(onStartLoad?: (r: Route) => void, onEndLoad?: (r: Route) => void): IRouterConfigLoader {
        return new AdminifyRouterConfigLoader(this.moduleLoader, this.compiler, onStartLoad, onEndLoad);
    }

}
