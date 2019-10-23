import {Injector} from '@angular/core';
import {LoadedRouterConfig, Route} from '@angular/router';
import {Observable} from 'rxjs';

export interface IRouterConfigLoader {
    load(parentInjector: Injector, route: Route): Observable<LoadedRouterConfig>;
}
