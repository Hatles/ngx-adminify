import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AdminPoolService} from '../services/admin-pool-service';

@Injectable()
export class AdminRouteGuard implements CanActivate {

    constructor(private pool: AdminPoolService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (route.data && route.data.admin) {
            const admin = this.pool.getAdmin(route.data.admin);
            return admin.canAccess();
        }

        return false;
    }
}
