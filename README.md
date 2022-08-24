# Compatibilities

**Which Version to use?**

| Angular version | Adminify version          |
|-----------------|---------------------------|
| Angular = 14    | `@ngx-adminify/***@1.4.x` |
| Angular = 10    | `@ngx-adminify/***@1.1.x` |
| Angular = 9     | `@ngx-adminify/***@1.0`   |
| Angular = 8     | `@ngx-adminify/***@0.x`   |

# Angular 14 breaking changes

Need to use loadDynamicModule or provideDynamicRoutes when loading module using DYNAMIC_MODULE_INITIALIZERS or import AdminifyModule.

```
@NgModule({
    imports: [
        RouterModule.forRoot([]),
    ],
    exports: [
        RouterModule,
    ],
    declarations: [],
    providers: [
        provideDynamicRoutes(() => [
            {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
            {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
            {path: '', redirectTo: 'admin', pathMatch: 'full'},
        ])
    ]
})
...
```

# NgxAdmin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
