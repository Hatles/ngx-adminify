import {Injector} from '@angular/core';
import {Route} from '../angular/router';
import {Observable} from 'rxjs';
import {LoadedRouterConfig} from "../angular/router/config";

export interface IRouterConfigLoader {
    load(parentInjector: Injector, route: Route): Observable<LoadedRouterConfig>;
}
