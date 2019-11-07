import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {AdminifyModule} from '@ngx-adminify/core';
import {AdminifyRouterModule, AdminifyOutletRouteProviders} from '@ngx-adminify/router';
import {AdminifyEntityModule, IAdminifyEntityService} from '@ngx-adminify/entity';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

class EntityService implements IAdminifyEntityService {

    private entities: BehaviorSubject<any[]>;

    constructor(entities: any[]) {
        this.entities = new BehaviorSubject(entities);
    }

    create(input: any): Observable<any> {
        this.entities.next([...this.entities.value, input]);
        return of(input);
    }

    delete(input: any): Observable<any> {
        this.entities.next(this.entities.value.filter(e => e.id !== input));
        return of();
    }

    get(input: any): Observable<any> {
        return this.entities.pipe(map(entities => entities.find(e => e.id === input)));
    }

    getAll(): Observable<any> {
        return this.entities.asObservable();
    }

    update(input: any): Observable<any> {
        return of(input);
    }
}

const entity: IAdminifyEntityService = new EntityService([
    {
        id: 1,
        title: 'test 1'
    },
    {
        id: 2,
        title: 'test 2'
    },
]);

const providers: AdminifyOutletRouteProviders = [
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        AdminifyModule.fotRoot(),
        AdminifyRouterModule.fotRoot({
            providers: providers
        }),
        AdminifyEntityModule.fotRoot([
            {
                name: 'test',
                provider: {
                    provide: 'test',
                    useValue: entity
                }
            }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
