import {
    ComponentFactoryResolver,
    createEnvironmentInjector,
    EnvironmentInjector,
    Injector,
    NgModuleRef,
    StaticProvider
} from "@angular/core";

export class DynamicModuleRef<T> extends NgModuleRef<T> {

  private readonly _injector: EnvironmentInjector;

  constructor(private parent: NgModuleRef<T>, providers: StaticProvider[] = []) {
    super();

    this._injector = createEnvironmentInjector(providers, parent.injector);
  }

  get componentFactoryResolver(): ComponentFactoryResolver {
    return this.parent.componentFactoryResolver;
  }

  destroy(): void {
    this.parent.destroy();
  }

  get injector(): EnvironmentInjector {
    return this._injector;
  }

  get instance(): any {
    return this.parent.instance;
  }

  onDestroy(callback: () => void): void {
    this.parent.onDestroy(callback);
  }

}
