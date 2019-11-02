import {Observable} from 'rxjs';
import {Admin} from '../admin';

export interface AdminGuard {
    canAccessAdmin(admin: Admin): boolean | Promise<boolean> | Observable<boolean>;
}
