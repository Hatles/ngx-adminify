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

    getAll(input: any): Observable<any> {
        return undefined;
    }

    update(input: any): Observable<any> {
        return undefined;
    }
}

// tslint:disable-next-line:max-line-length
export interface IBaseAdminifyEntityService<TEntity, TPrimaryKey, TGetAllResult, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput> {
    get(input: TGetInput): Observable<TEntity>;
    getAll(input: TGetAllInput): Observable<TGetAllResult>;
    create(input: TCreateInput): Observable<TEntity>;
    update(input: TUpdateInput): Observable<TEntity>;
    delete(input: TDeleteInput): Observable<any>;
}
