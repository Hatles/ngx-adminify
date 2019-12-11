import {AdminBaseComponent} from '../../../components/admin-base/admin-base.component';
import {AdminActionBaseComponent} from '../../../components/admin-action-base/admin-action-base.component';
import {AdminifyMatListActionComponent} from '../../../../material/components/adminify-mat-list-action/adminify-mat-list-action.component';
import {AdminViewActionBaseComponent} from '../../../components/admin-view-action-base/admin-view-action-base.component';
import {AdminEditActionBaseComponent} from '../../../components/admin-edit-action-base/admin-edit-action-base.component';
import {entityFactory} from '@ngx-adminify/entity';
import {userEntity} from '../../entities/users';

export const userAdmin = {
    name: 'users',
    path: 'users',
    component: AdminBaseComponent,
    actions: [
        {
            name: 'dashboard',
            path: 'dashboard',
            component: AdminActionBaseComponent
        },
        {
            name: 'list',
            path: 'list',
            component: AdminifyMatListActionComponent,
            actionData: {
                entityList: userEntity.list,
                sortActive: 'username',
                sortDirection: 'asc'
            }
        },
        {
            name: 'view',
            path: 'view/:id',
            component: AdminViewActionBaseComponent,
            actionData: {
                entityView: userEntity.list
            }
        },
        {
            name: 'edit',
            path: 'edit/:id',
            // component: AdminEditActionBaseComponent,
            componentName: 'AdminEditActionBaseComponent',
            actionData: {
                entityEdit: userEntity.edit
            }
        },
        {
            name: 'create',
            path: 'create',
            component: AdminEditActionBaseComponent,
            actionData: {
                entityEdit: userEntity.edit,
                entityEditMode: 'create'
            }
        },
    ],
    defaultActionName: 'dashboard',
    entityService: 'users',
    factory: entityFactory
};
