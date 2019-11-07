import {Observable} from 'rxjs';

export interface IAdminifyEntityService extends IBaseAdminifyEntityService<any, any, any, any, any, any, any, any> {
}

export interface IBaseAdminifyEntityService<TEntity, TPrimaryKey, TGetAllResult, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput> {
    get(input: TGetAllInput): Observable<TEntity>;
    getAll(): Observable<TGetAllResult>;
    create(input: TCreateInput): Observable<TEntity>;
    update(input: TUpdateInput): Observable<TEntity>;
    delete(input: TDeleteInput): Observable<any>;
}
