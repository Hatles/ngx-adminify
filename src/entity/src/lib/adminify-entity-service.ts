import {Observable} from 'rxjs';

export interface IAdminifyEntityService extends IBaseAdminifyEntityService<any, any, any, any, any, any, any, any> {
}

export class AdminifyEntityService implements IAdminifyEntityService {
    create(input: any): Observable<any> {
        return undefined;
    }

    delete(input: any): Observable<any> {
        return undefined;
    }

    get(input: any): Observable<any> {
        return undefined;
    }

    getAll(): Observable<any> {
        return undefined;
    }

    update(input: any): Observable<any> {
        return undefined;
    }
}

export interface IBaseAdminifyEntityService<TEntity, TPrimaryKey, TGetAllResult, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput> {
    get(input: TGetAllInput): Observable<TEntity>;
    getAll(): Observable<TGetAllResult>;
    create(input: TCreateInput): Observable<TEntity>;
    update(input: TUpdateInput): Observable<TEntity>;
    delete(input: TDeleteInput): Observable<any>;
}
