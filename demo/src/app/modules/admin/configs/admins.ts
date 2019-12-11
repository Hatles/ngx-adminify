import {EntityAdminsConfig} from '@ngx-adminify/entity';
import {AdminDashboardBaseComponent} from '../components/admin-dashboard-base/admin-dashboard-base.component';
import {AdminifyMatRootComponent} from '../../material/adminify-mat-root/adminify-mat-root.component';
import {testAdmin} from './admins/tests';
import {userAdmin} from './admins/users';
import {todoAdmin} from './admins/todos';


export const admins: EntityAdminsConfig = {
    path: 'adminconfig',
    data: {test: 'test'},
    component: AdminifyMatRootComponent,
    defaultAdminName: 'dashboard',
    adminsData: {
        test: 'test admins'
    },
    admins: [
        {
            name: 'dashboard',
            path: 'dashboard',
            component: AdminDashboardBaseComponent,
        },
        testAdmin,
        userAdmin,
        todoAdmin
    ]
};
