import {IAdminifyEntityService} from '../../../../../../../src/entity/src/lib/adminify-entity-service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';

export class EntityService implements IAdminifyEntityService {

    private keySequence: number;
    private entities: BehaviorSubject<any[]>;

    constructor(entityList: any[], private key: string = 'id') {
        this.entities = new BehaviorSubject(entityList);
        this.keySequence = entityList.reduce((max, current) => max < this.getKey(current) ? this.getKey(current) : max, 0) + 1;
    }

    create(input: any): Observable<any> {
        if (!this.getKey(input)) {
            this.setKey(input, this.keySequence++);
        }
        this.entities.next([...this.entities.value, input]);
        return of(input).pipe(delay(1000));
    }

    delete(input: any): Observable<any> {
        this.entities.next(this.entities.value.filter(e => e.id !== input));
        return of().pipe(delay(1000));
    }

    get(input: any): Observable<any> {
        return this.entities.pipe(map(entityList => entityList.find(e => this.getKey(e) === input)), delay(1000));
    }

    getAll(): Observable<any> {
        return this.entities.asObservable().pipe(delay(1000));
    }

    update(input: any): Observable<any> {
        return of(input).pipe(delay(1000));
    }

    getKey(input: any): any {
        return input[this.key];
    }

    setKey(input: any, key: any) {
        input[this.key] = key;
    }
}
