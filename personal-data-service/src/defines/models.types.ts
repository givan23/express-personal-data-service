interface ISequelize {
    define: (name: string, attributes: object, options?: object) => any;
}

interface IDataTypes {
    INTEGER: any;
    STRING: any;
    DATE: any;
}

export type {ISequelize, IDataTypes};