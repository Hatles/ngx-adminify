import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'template'
})
export class TemplatePipe implements PipeTransform {

    transform(value: string, ...args: any[]): any {
        return this.retrieveValue(value, args[0] || {});
    }

    private retrieveValue(from: string, arg: any) {
        const regex = /{{([^{}]*)}}/gm;

        return from.replace(regex, (prop) => getProperty(arg, prop.slice(2, -2).trim()));
    }

}

export const getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
);
