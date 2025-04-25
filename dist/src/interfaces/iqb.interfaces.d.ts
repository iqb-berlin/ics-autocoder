import { Response as ResponseBase } from '@iqb/responses';
import { ResponseValueType, VariableCodingData } from '@iqb/responses/coding-interfaces';
export interface Response extends ResponseBase {
    codingProbabilities?: CodingProbabilities;
}
export interface CodingProbabilities {
    [code: string]: number;
}
export declare const ResponseStatusList: string[];
export type AutoCodingInstructions = {
    variableCodings: VariableCodingData[];
};
export declare const isA: <K>(collection: string[] | readonly string[], str: unknown) => str is K;
export declare const isArrayOf: <T>(thing: unknown, typeGuard: ((t: unknown) => t is T)) => thing is T[];
export declare const isMapOf: <T>(thing: unknown, typeGuard: ((t: unknown) => t is T)) => thing is {
    [key: string]: T;
};
export declare const contains: <Key extends PropertyKey, Z>(thing: unknown, fieldName: Key, example: Z) => thing is Record<Key, Z>;
export declare const isCarrier: <Key extends string, Z extends string>(thing: unknown, fieldName: Key, collection: Z[] | readonly Z[]) => thing is { [fieldName in Key]: Z; };
export declare const isResponseValueType: (thing: unknown) => thing is ResponseValueType;
export declare const isCodingProbabilities: (thing: unknown) => thing is CodingProbabilities;
export declare const isResponse: (thing: unknown) => thing is Response;
export declare const isResponseList: (thing: unknown) => thing is Response[];
export declare const debugTypeguard: <T>(input: unknown, typeguard: (thing: unknown) => thing is T) => input is T;
