import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Admin} from '@ngx-adminify/core';

@Injectable()
export class ActiveAdminService {

    private _admin: BehaviorSubject<Admin> = new BehaviorSubject(undefined);
    admin: Observable<Admin> = this._admin.asObservable();

    constructor() {
    }

    setActive(admin: Admin) {
        this._admin.next(admin);
    }

    quit() {
        this.setActive(undefined);
    }
}
