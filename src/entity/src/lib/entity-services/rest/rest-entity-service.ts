import {IBaseAdminifyEntityService} from '../../adminify-entity-service';
import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpParams,
} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {catchError, delay, map, timeout} from 'rxjs/operators';

import {DataServiceError} from './data-service-error';
import {
    HttpMethods,
    QueryParams,
    RequestData,
} from './request-data';
import {EntityHttpResourceUrls, HttpUrlGenerator} from './http-url-generator';

export const REST_ENTITY_SERVICE_CONFIG = new InjectionToken<RestEntityServiceConfig>('REST_ENTITY_SERVICE_CONFIG');

export interface RestEntityServiceConfig {
    /** root path of the web api (default: 'api') */
    root?: string;
    /**
     * Known entity HttpResourceUrls.
     * HttpUrlGenerator will create these URLs for entity types not listed here.
     */
    entityHttpResourceUrls?: EntityHttpResourceUrls;
    /** Is a DELETE 404 really OK? (default: true) */
    delete404OK?: boolean;
    /** Simulate GET latency in a demo (default: 0) */
    getDelay?: number;
    /** Simulate save method (PUT/POST/DELETE) latency in a demo (default: 0) */
    saveDelay?: number;
    /** request timeout in MS (default: 0) */
    timeout?: number; //
    /** key property */
    key?: string;
}

export interface Update<TUpdateInput, TPrimaryKey> {
    id: TPrimaryKey;
    changes: TUpdateInput;
}

/**
 * A basic, generic entity data service
 * suitable for persistence of most entities.
 * Assumes a common REST-y web API
 */
// tslint:disable-next-line:max-line-length
export class BaseRestEntityService<TEntity, TPrimaryKey, TGetAllResult, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput> implements IBaseAdminifyEntityService<TEntity, TPrimaryKey, TGetAllResult, TGetAllInput, TCreateInput, Update<TUpdateInput, TPrimaryKey>, TGetInput, TDeleteInput> {

    // tslint:disable-next-line:variable-name
    protected _name: string;
    protected delete404OK: boolean;
    protected entityName: string;
    protected entityUrl: string;
    protected entitiesUrl: string;
    protected getDelay = 0;
    protected saveDelay = 0;
    protected timeout = 0;
    protected key: string;

    get name() {
        return this._name;
    }

    constructor(
        entityName: string,
        protected http: HttpClient,
        protected httpUrlGenerator: HttpUrlGenerator,
        config?: RestEntityServiceConfig
    ) {
        this._name = `${entityName} DefaultDataService`;
        this.entityName = entityName;
        const {
            root = 'api',
            delete404OK = true,
            getDelay = 0,
            saveDelay = 0,
            timeout: to = 0,
            key = 'id',
        } =
        config || {};
        this.delete404OK = delete404OK;
        this.entityUrl = httpUrlGenerator.entityResource(entityName, root);
        this.entitiesUrl = httpUrlGenerator.collectionResource(entityName, root);
        this.getDelay = getDelay;
        this.saveDelay = saveDelay;
        this.timeout = to;
        this.key = key;
    }

    create(entity: TCreateInput): Observable<TEntity> {
        const entityOrError =
            entity || new Error(`No "${this.entityName}" entity to add`);
        return this.execute('POST', this.entityUrl, entityOrError);
    }

    delete(entity: TDeleteInput): Observable<TDeleteInput> {
        let err: Error | undefined;
        if (entity == null) {
            err = new Error(`No "${this.entityName}" key to delete`);
        }
        return this.execute('DELETE', this.entityUrl + entity, err).pipe(
            // forward the id of deleted entity as the result of the HTTP DELETE
            map(result => entity)
        );
    }

    getAll(entities: TGetAllInput): Observable<TGetAllResult> {
        return this.execute('GET', this.entitiesUrl);
    }

    get(entity: TGetInput): Observable<TEntity> {
        let err: Error | undefined;
        if (entity == null) {
            err = new Error(`No "${this.entityName}" key to get`);
        }
        return this.execute('GET', this.entityUrl + entity, err);
    }

    update(update: Update<TUpdateInput, TPrimaryKey>): Observable<TEntity> {
        const id = update && update.id;
        const updateOrError =
            id == null
                ? new Error(`No "${this.entityName}" update data or id`)
                : update.changes;
        return this.execute('PUT', this.entityUrl + id, updateOrError);
    }

    protected execute(
        method: HttpMethods,
        url: string,
        data?: any, // data, error, or undefined/null
        options?: any
    ): Observable<any> {
        const req: RequestData = {method, url, data, options};

        if (data instanceof Error) {
            return this.handleError(req)(data);
        }

        let result$: Observable<ArrayBuffer>;

        switch (method) {
            case 'DELETE': {
                result$ = this.http.delete(url, options);
                if (this.saveDelay) {
                    result$ = result$.pipe(delay(this.saveDelay));
                }
                break;
            }
            case 'GET': {
                result$ = this.http.get(url, options);
                if (this.getDelay) {
                    result$ = result$.pipe(delay(this.getDelay));
                }
                break;
            }
            case 'POST': {
                result$ = this.http.post(url, data, options);
                if (this.saveDelay) {
                    result$ = result$.pipe(delay(this.saveDelay));
                }
                break;
            }
            // N.B.: It must return an Update<T>
            case 'PUT': {
                result$ = this.http.put(url, data, options);
                if (this.saveDelay) {
                    result$ = result$.pipe(delay(this.saveDelay));
                }
                break;
            }
            default: {
                const error = new Error('Unimplemented HTTP method, ' + method);
                result$ = throwError(error);
            }
        }
        if (this.timeout) {
            result$ = result$.pipe(timeout(this.timeout + this.saveDelay));
        }
        return result$.pipe(catchError(this.handleError(req)));
    }

    private handleError(reqData: RequestData) {
        return (err: any) => {
            const ok = this.handleDelete404(err, reqData);
            if (ok) {
                return ok;
            }
            const error = new DataServiceError(err, reqData);
            return throwError(error);
        };
    }

    private handleDelete404(error: HttpErrorResponse, reqData: RequestData) {
        if (
            error.status === 404 &&
            reqData.method === 'DELETE' &&
            this.delete404OK
        ) {
            return of({});
        }
        return undefined;
    }

    getKey(input: TEntity): TPrimaryKey {
        return input[this.key];
    }
}

// tslint:disable-next-line:max-line-length
export class RestEntityService<TEntity> extends BaseRestEntityService<TEntity, any, any, any, Partial<TEntity>, Partial<TEntity>, any, any> {
}

/**
 * Create a basic, generic entity data service
 * suitable for persistence of most entities.
 * Assumes a common REST-y web API
 */
@Injectable()
export class DefaultRestEntityServiceFactory {
    constructor(
        protected http: HttpClient,
        protected httpUrlGenerator: HttpUrlGenerator,
        @Optional() @Inject(REST_ENTITY_SERVICE_CONFIG) protected config?: RestEntityServiceConfig
    ) {
        this.config = config || {};
        httpUrlGenerator.registerHttpResourceUrls(this.config.entityHttpResourceUrls);
    }

    /**
     * Create a default {EntityCollectionDataService} for the given entity type
     * @param entityName Name of the entity type for this data service
     */
    create<TEntity>(entityName: string): RestEntityService<TEntity> {
        return new RestEntityService<TEntity>(
            entityName,
            this.http,
            this.httpUrlGenerator,
            this.config
        );
    }
}
