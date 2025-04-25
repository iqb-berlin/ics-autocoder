export declare const validStatesForDerivingValue: string[];
export declare const validStatesForDerivingCode: string[];
export declare const validStatesToStartDeriving: string[];
export declare const statesToReplaceByDeriveError: string[];
export declare const deriveMethodsFromValue: string[];
export type ResponseValueSingleType = null | string | number | boolean;
export type ResponseValueType = ResponseValueSingleType | ResponseValueSingleType[];
export type TransformedResponseValueType = ResponseValueType | string[][];
export type RuleMethod = 'MATCH' | 'MATCH_REGEX' | 'NUMERIC_MATCH' | 'NUMERIC_RANGE' | 'NUMERIC_FULL_RANGE' | 'NUMERIC_LESS_THAN' | 'NUMERIC_MORE_THAN' | 'NUMERIC_MAX' | 'NUMERIC_MIN' | 'IS_EMPTY' | 'IS_NULL' | 'IS_TRUE' | 'IS_FALSE';
export declare const RuleMethodParameterCount: {
    MATCH: number;
    MATCH_REGEX: number;
    NUMERIC_MATCH: number;
    NUMERIC_RANGE: number;
    NUMERIC_FULL_RANGE: number;
    NUMERIC_LESS_THAN: number;
    NUMERIC_MORE_THAN: number;
    NUMERIC_MAX: number;
    NUMERIC_MIN: number;
    IS_EMPTY: number;
    IS_NULL: number;
    IS_TRUE: number;
    IS_FALSE: number;
};
export declare const numericRules: string[];
export declare const booleanRules: string[];
export type ProcessingParameterType = 'IGNORE_CASE' | 'IGNORE_ALL_SPACES' | 'IGNORE_DISPENSABLE_SPACES' | 'SORT_ARRAY' | 'REPLAY_REQUIRED' | 'ATTACHMENT';
export type CodeModelType = 'NONE' | 'RULES_ONLY' | 'MANUAL_ONLY';
export type CodeType = 'UNSET' | 'FULL_CREDIT' | 'PARTIAL_CREDIT' | 'NO_CREDIT' | 'TO_CHECK' | 'RESIDUAL' | 'RESIDUAL_AUTO' | 'INTENDED_INCOMPLETE';
export type SourceType = 'BASE' | 'BASE_NO_VALUE' | 'MANUAL' | 'COPY_VALUE' | 'CONCAT_CODE' | 'SUM_CODE' | 'SUM_SCORE' | 'UNIQUE_VALUES' | 'SOLVER';
export type SourceProcessingType = 'TO_LOWER_CASE' | 'TO_NUMBER' | 'REMOVE_ALL_SPACES' | 'REMOVE_DISPENSABLE_SPACES' | 'TAKE_DISPLAYED_AS_VALUE_CHANGED' | 'TAKE_EMPTY_AS_VALID' | 'SORT' | 'NO_CODING' | 'TAKE_NOT_REACHED_AS_VALUE_CHANGED';
export declare const DeriveConcatDelimiter = "_";
export type CodingSchemeProblemType = 'VACANT' | 'SOURCE_MISSING' | 'INVALID_SOURCE' | 'RULE_PARAMETER_COUNT_MISMATCH' | 'MORE_THAN_ONE_SOURCE' | 'ONLY_ONE_SOURCE' | 'VALUE_COPY_NOT_FROM_BASE';
export interface CodingRule {
    method: RuleMethod;
    parameters?: string[];
    fragment?: number;
}
export interface RuleSet {
    ruleOperatorAnd: boolean;
    rules: CodingRule[];
    valueArrayPos?: number | 'ANY' | 'ANY_OPEN' | 'SUM' | 'LENGTH';
}
export interface CodeData {
    id: number | 'INVALID' | 'INTENDED_INCOMPLETE';
    type: CodeType;
    label: string;
    score: number;
    ruleSetOperatorAnd: boolean;
    ruleSets: RuleSet[];
    manualInstruction: string;
}
export declare const CodingSchemeVersionMajor = 3;
export declare const CodingSchemeVersionMinor = 0;
export interface VariableSourceParameters {
    solverExpression?: string;
    processing?: SourceProcessingType[];
}
export interface VariableCodingData {
    id: string;
    alias: string;
    label: string;
    sourceType: SourceType;
    sourceParameters: VariableSourceParameters;
    deriveSources: string[];
    processing: ProcessingParameterType[];
    fragmenting?: string;
    manualInstruction: string;
    codeModel?: CodeModelType;
    page?: string;
    codes: CodeData[];
}
export declare class CodingScheme {
    variableCodings: VariableCodingData[];
    constructor(givenScheme: any);
    private static getCodeVersionLessThan3;
    static checkVersion(givenScheme: any): 'OK' | 'MAJOR_LESS' | 'MAJOR_GREATER' | 'MINOR_GREATER';
    toString(): string;
}
