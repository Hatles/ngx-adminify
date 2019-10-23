import {Route} from '@angular/router';

export const buildAdminRootByData = (route: Route, dataName: string): Route => {
    return {...route, data: {...route.data, [dataName]: true}};
};
