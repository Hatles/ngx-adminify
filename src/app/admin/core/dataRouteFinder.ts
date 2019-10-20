import {RouteFinder} from './adminConfig';
import {Route} from '@angular/router';

export const dataRouteFinder = (dataName: string): RouteFinder => {
    return (route: Route) => route && route.data && route.data.hasOwnProperty(dataName) && route.data[dataName];
};
