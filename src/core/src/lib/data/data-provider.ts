import {Data} from '@angular/router';

export interface IDataProvider {
    getData(): Data;
    getData<T>(dataName: string, defaultValue?: T): T;
}
