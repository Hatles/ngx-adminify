import {AdminBaseComponent} from '../../../components/admin-base/admin-base.component';
import {AdminActionBaseComponent} from '../../../components/admin-action-base/admin-action-base.component';
import {AdminifyMatListActionComponent} from '../../../../material/components/adminify-mat-list-action/adminify-mat-list-action.component';
import {AdminViewActionBaseComponent} from '../../../components/admin-view-action-base/admin-view-action-base.component';
import {AdminEditActionBaseComponent} from '../../../components/admin-edit-action-base/admin-edit-action-base.component';
import {EntityFactory} from '@ngx-adminify/entity';
import {todoEntity} from '../../entities/todos';

export const todoAdmin = {
    name: 'todos',
    path: 'todos',
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
                entityList: todoEntity.list,
                pageSize: 10
            },
        },
        {
            name: 'view',
            path: 'view/:id',
            component: AdminViewActionBaseComponent,
            actionData: {
                entityView: todoEntity.list
            }
        },
        {
            name: 'edit',
            path: 'edit/:id',
            component: AdminEditActionBaseComponent,
            actionData: {
                entityEdit: todoEntity.edit
            }
        },
        {
            name: 'create',
            path: 'create',
            component: AdminEditActionBaseComponent,
            actionData: {
                entityEdit: todoEntity.edit,
                entityEditMode: 'create'
            }
        }
    ],
    defaultActionName: 'dashboard',
    entityService: 'todos',
    factory: new EntityFactory()
};
