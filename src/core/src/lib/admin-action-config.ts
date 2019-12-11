import {Data, Route} from '@angular/router';

export interface AdminActionConfig extends Route {
    name: string;
    label?: string;
    icon?: string;
    actionData?: Data;
    componentName?: string;
}
