/* tslint:disable */
export interface TypeMap { // for mapping from strings to types
    string: string;
    number: number;
    boolean: boolean;
}

export type PrimitiveOrConstructor = // 'string' | 'number' | 'boolean' | constructor
    | { new (...args: any[]): any }
    | keyof TypeMap;

// infer the guarded type from a specific case of PrimitiveOrConstructor
export type GuardedType<T extends PrimitiveOrConstructor> = T extends { new(...args: any[]): infer U; } ? U : T extends keyof TypeMap ? TypeMap[T] : never;

// finally, guard ALL the types!
export function typeGuard<T extends PrimitiveOrConstructor>(o, className: T):
    o is GuardedType<T> {
    const localPrimitiveOrConstructor: PrimitiveOrConstructor = className;
    if (typeof localPrimitiveOrConstructor === 'string') {
        return typeof o === localPrimitiveOrConstructor;
    }
    return o instanceof localPrimitiveOrConstructor;
}
