import {Injectable, NgModuleRef, StaticProvider} from "@angular/core";
import {DYNAMIC_MODULE_INITIALIZER} from "./dynamic-module-initializer";
import {forkJoin, from, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {DynamicModuleRef} from "./dynamic-module-ref";

@Injectable()
export class DynamicModuleLoader {
  load<T>(moduleRef: NgModuleRef<T>): Promise<NgModuleRef<T>> {

    const initializers = moduleRef.injector.get(DYNAMIC_MODULE_INITIALIZER, []);

    if (initializers && initializers.length) {
      const allInits = initializers.map(i => {
        const initResult = i();

        if(initResult instanceof Promise) {
          return from(initResult);
        }
        if(initResult instanceof Observable) {
          return initResult;
        }
        return of(initResult);
      });

      return forkJoin(allInits).pipe(map((providersList) => {
        // const providers: StaticProvider[] = providersList.reduce((acc, p) => [...(acc || []), ...(p || [])], []) as StaticProvider[];

        const dynamicModule = new DynamicModuleRef<T>(moduleRef);

        return dynamicModule;
      })).toPromise();
    }

    return new Promise(resolve => resolve(moduleRef));
  }
}
