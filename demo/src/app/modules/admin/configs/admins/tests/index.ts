import {AdminBaseComponent} from '../../../components/admin-base/admin-base.component';
import {AdminActionBaseComponent} from '../../../components/admin-action-base/admin-action-base.component';
import {AdminifyMatListActionComponent} from '../../../../material/components/adminify-mat-list-action/adminify-mat-list-action.component';
import {AdminViewActionBaseComponent} from '../../../components/admin-view-action-base/admin-view-action-base.component';
import {AdminEditActionBaseComponent} from '../../../components/admin-edit-action-base/admin-edit-action-base.component';
import {entityFactory} from '@ngx-adminify/entity';
import {testEntity} from '../../entities/tests';

export const testAdmin = {
    name: 'test',
    path: 'test',
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
                entityList: testEntity.list,
            },
        },
        {
            name: 'view',
            path: 'view/:id',
            component: AdminViewActionBaseComponent,
            actionData: {
                entityView: testEntity.list
            }
        },
        {
            name: 'edit',
            path: 'edit/:id',
            component: AdminEditActionBaseComponent,
            actionData: {
                entityEdit: testEntity.edit
            }
        },
        {
            name: 'create',
            path: 'create',
            component: AdminEditActionBaseComponent,
            actionData: {
                entityEdit: testEntity.edit,
                entityEditMode: 'create'
            }
        }
    ],
    defaultActionName: 'dashboard',
    entityService: 'test',
    factory: entityFactory
};
