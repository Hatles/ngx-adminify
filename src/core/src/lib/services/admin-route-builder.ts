import {removePreFix} from '../remove-pre-fix';

export interface RouteParametersValues {
    [key: string]: string;
}

export interface RouteSegmentOrParameter {
    value: string;
    isParameter: boolean;
}

export class AdminRouteBuilder {

    private parameters: string[];
    private segmentsAndParameters: RouteSegmentOrParameter[];

    constructor(public path: string) {
        this.processPath();
    }

    private static getParameterInObject(parameters: RouteParametersValues, parameter: string): string {
        if (!parameters.hasOwnProperty(parameter)) {
            throw new Error('parameters doesn\'t contains parameter with name "' + parameter + '"');
        }

        return parameters[parameter];
    }

    getUrl(...parameters: string[]): string[];

    getUrl(parameters?: string[] | RouteParametersValues): string[];

    getUrl(parameters?: any): string[] {
        if (!parameters) {
            return this.getUrlByObject({});
        } else if (Array.isArray(parameters)) {
            return this.getUrlByArray(parameters);
        } else if (typeof parameters === 'object') {
            return this.getUrlByObject(parameters);
        }

        throw new Error('parameters must be an array, an object, or null');
    }

    private processPath() {
        this.parameters = [];
        this.segmentsAndParameters = this.path.split('/').map(segment => {
            if (segment.startsWith(':')) {
                const parameter = removePreFix(segment, ':');

                this.parameters.push(parameter);

                return {
                    value: parameter,
                    isParameter: true
                };
            }

            return {value: segment, isParameter: false};
        });
    }

    private getUrlByArray(parameters: string[]): string[] {
        if (parameters.length !== this.parameters.length) {
            throw new Error('parameters must contains ' + this.parameters.length + ' elements, instead of ' + parameters.length);
        }

        const objectParameters: RouteParametersValues = {};

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.parameters.length; i++) {
            objectParameters[this.parameters[i]] = parameters[i];
        }

        return this.getUrlByObject(objectParameters);
    }

    private getUrlByObject(parameters: RouteParametersValues): string[] {
        return this.segmentsAndParameters.map(segmentOrParameter => {
            if (segmentOrParameter.isParameter) {
                return AdminRouteBuilder.getParameterInObject(parameters, segmentOrParameter.value);
            } else {
                return segmentOrParameter.value;
            }
        });
    }

    hasParameters(): boolean {
        return this.parameters.length > 0;
    }
}
