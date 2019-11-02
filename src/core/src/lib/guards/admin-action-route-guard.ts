import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AdminPoolService} from '../services/admin-pool-service';

@Injectable()
export class AdminActionRouteGuard implements CanActivate {

    constructor(private pool: AdminPoolService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (route.data && route.data.action && route.data.actionAdmin) {
            const admin = this.pool.getAdmin(route.data.actionAdmin);
            return admin.canAccessAction(route.data.action);
        }

        return false;
    }
}
