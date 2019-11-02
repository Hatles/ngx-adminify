import {Observable} from 'rxjs';
import {Admin} from '../admin';
import {AdminAction} from '../admin-action';

export interface AdminActionGuard {
    canAccessAction(admin: Admin, action: AdminAction): boolean | Promise<boolean> | Observable<boolean>;
}
