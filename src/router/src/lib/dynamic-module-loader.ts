import {
    Compiler,
    inject,
    Injector,
    NgModuleFactory,
    NgModuleRef, Provider,
    Type,
    ɵisPromise as isPromise
} from "@angular/core";
import {DYNAMIC_MODULE_INITIALIZER} from "./dynamic-module-initializer";
import {forkJoin, from, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import { LoadChildrenCallback, ROUTES, Routes } from "@angular/router";

export function loadDynamicInitializers(injector: Injector): Observable<any> {
    const initializers = injector.get(DYNAMIC_MODULE_INITIALIZER, []);

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

        return forkJoin(allInits);
    }

    return of();
}

export function createDynamicModuleFactory(moduleFactory: NgModuleFactory<any>, parentInjector: Injector): Promise<NgModuleFactory<any>> {
    const moduleRef = moduleFactory.create(parentInjector);

    return loadDynamicInitializers(moduleRef.injector).pipe(map((providersList) => {
        // const providers: StaticProvider[] = providersList.reduce((acc, p) => [...(acc || []), ...(p || [])], []) as StaticProvider[];

        const dynamicModuleFactory = new DynamicModuleWithProvidersFactory<any>(moduleFactory, moduleRef);

        return dynamicModuleFactory;
    })).toPromise();
}

export class DynamicModuleWithProvidersFactory<T> extends NgModuleFactory<T> {
    private _parent: NgModuleFactory<T>;
    private _module: NgModuleRef<T>;

    constructor(parent: NgModuleFactory<T>, module: NgModuleRef<T>) {
        super();
        this._parent = parent;
        this._module = module;
    }

    get moduleType(): Type<T> {
        return this._parent.moduleType;
    }

    create(parentInjector: Injector | null) {
        // const data = (parentInjector as any)._data;
        // debugger;
        return this._module;


        // const injector = Injector.create({
        //     providers: this.moduleWithProviders.providers as StaticProvider[],
        //     parent: parentInjector
        // });
        //
        // const compiler = injector.get(Compiler);
        // const factory = compiler.compileModuleSync(this.moduleType);
        //
        // return factory.create(injector);
    }
}

export function provideDynamicRoutes(factory: () => Routes, deps: any[] = null): Provider {
    return {
        provide: ROUTES,
        useFactory: () => factory().map(r => {
            if (r.loadChildren) {
                return ({...r, loadChildren: loadDynamicModule(r.loadChildren)});
            }
            return r;

        }),
        multi: true,
        deps: deps
    }
}

export function loadDynamicModule(loaderCallback: LoadChildrenCallback): LoadChildrenCallback {
    const compiler = inject(Compiler);
    const parentInjector = inject(Injector);
    const loader: () => Promise<Type<any> | NgModuleFactory<any> | Routes> = loaderCallback as any;

    return () => {
        const loaded = loader();

        // todo: support sync and observable
        if (!isPromise(loaded)) {
            return loaded;
        }

        return loaded
            .then((t: Type<any> | NgModuleFactory<any> | Routes) => {
                if (t instanceof NgModuleFactory || Array.isArray(t)) {
                    return t;
                } else {
                    return compiler.compileModuleAsync(t);
                }
            })
            .then(m => {
                if (Array.isArray(m)) {
                    return m as NgModuleFactory<any> | Routes;
                }
                return createDynamicModuleFactory(m, parentInjector);
            });
    }
}
