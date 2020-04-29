import {Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadedRouterConfig, Route} from "../angular/router/config";

export interface IRouterConfigLoader {
    load(parentInjector: Injector, route: Route): Observable<LoadedRouterConfig>;
}
