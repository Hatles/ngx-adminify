import {Route} from '@angular/router';
import {RouteFinder} from './adminConfig';

export const dataRouteFinder = (dataName: string): RouteFinder => {
    return (route: Route) => route && route.data && route.data.hasOwnProperty(dataName) && route.data[dataName];
};
