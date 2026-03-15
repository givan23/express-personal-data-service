interface ISequelize {
    define: (name: string, attributes: object, options?: object) => any;
}

interface IDataTypes {
    INTEGER: any;
    STRING: any;
    DATE: any;
    ARRAY: (type: any) => any;
    ENUM: (...values: string[]) => any;
}

export type {ISequelize, IDataTypes};