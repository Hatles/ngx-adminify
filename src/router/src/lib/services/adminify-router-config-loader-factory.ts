import {IRouterConfigLoaderFactory, RouterConfigLoaderFactory} from '@angular/router/router-config-loader-factory';
import {Compiler, Injectable, NgModuleFactoryLoader} from '@angular/core';
import {Route} from '@angular/router/config';
import {AdminifyRouterConfigLoader} from '@angular/router/adminify-router-config-loader';
import {IRouterConfigLoader} from '@angular/router/router-config-loader';

@Injectable()
export class AdminifyRouterConfigLoaderFactory implements IRouterConfigLoaderFactory {

    constructor(private moduleLoader: NgModuleFactoryLoader, private compiler: Compiler) {
    }

    get(onStartLoad?: (r: Route) => void, onEndLoad?: (r: Route) => void): IRouterConfigLoader {
        return new AdminifyRouterConfigLoader(this.moduleLoader, this.compiler, onStartLoad, onEndLoad);
    }

}
