import {Data, Route} from '@angular/router';

export interface AdminActionConfig extends Route {
    name: string;
    actionData?: Data;
}
