import {Component, Inject} from '@angular/core';
import {Admin, AdminAction} from '@ngx-adminify/core';
import {AdminifyEntityService} from '@ngx-adminify/entity';

@Component({
  selector: 'app-admin-action-base',
  templateUrl: './admin-action-base.component.html',
  styleUrls: ['./admin-action-base.component.scss']
})
export class AdminActionBaseComponent {

    constructor(
        public admin: Admin,
        public action: AdminAction,
        public entity: AdminifyEntityService) {
    }

}
