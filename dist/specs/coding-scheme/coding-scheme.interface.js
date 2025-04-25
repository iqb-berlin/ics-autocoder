"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodingScheme = exports.CodingSchemeVersionMinor = exports.CodingSchemeVersionMajor = exports.DeriveConcatDelimiter = exports.booleanRules = exports.numericRules = exports.RuleMethodParameterCount = exports.deriveMethodsFromValue = exports.statesToReplaceByDeriveError = exports.validStatesToStartDeriving = exports.validStatesForDerivingCode = exports.validStatesForDerivingValue = void 0;
exports.validStatesForDerivingValue = ['VALUE_CHANGED', 'NO_CODING', 'CODING_INCOMPLETE',
    'CODING_ERROR', 'CODING_COMPLETE'];
exports.validStatesForDerivingCode = ['CODING_COMPLETE'];
exports.validStatesToStartDeriving = ['UNSET', 'CODING_ERROR', 'CODING_INCOMPLETE'];
exports.statesToReplaceByDeriveError = ['NO_CODING', 'CODING_INCOMPLETE', 'CODING_ERROR'];
exports.deriveMethodsFromValue = ['SOLVER', 'COPY_VALUE', 'UNIQUE_VALUES'];
exports.RuleMethodParameterCount = {
    MATCH: -1,
    MATCH_REGEX: -1,
    NUMERIC_MATCH: -1,
    NUMERIC_RANGE: 2,
    NUMERIC_FULL_RANGE: 2,
    NUMERIC_LESS_THAN: 1,
    NUMERIC_MORE_THAN: 1,
    NUMERIC_MAX: 1,
    NUMERIC_MIN: 1,
    IS_EMPTY: 0,
    IS_NULL: 0,
    IS_TRUE: 0,
    IS_FALSE: 0
};
exports.numericRules = ['NUMERIC_MATCH', 'NUMERIC_LESS_THAN', 'NUMERIC_MAX', 'NUMERIC_MORE_THAN',
    'NUMERIC_MIN', 'NUMERIC_RANGE'];
exports.booleanRules = ['IS_TRUE', 'IS_FALSE'];
exports.DeriveConcatDelimiter = '_';
exports.CodingSchemeVersionMajor = 3;
exports.CodingSchemeVersionMinor = 0;
class CodingScheme {
    constructor(givenScheme) {
        this.variableCodings = [];
        const transformedScheme = typeof givenScheme === 'string' ? JSON.parse(givenScheme) : givenScheme;
        let codingSchemeMajorVersion = 0;
        if (!Array.isArray(transformedScheme) && transformedScheme.version) {
            const versionMatches = /^(\d+).(\d+)$/.exec(transformedScheme.version);
            if (versionMatches && versionMatches.length > 2) {
                codingSchemeMajorVersion = Number.parseInt(versionMatches[1], 10);
            }
        }
        const givenCodings = Array.isArray(transformedScheme) ?
            transformedScheme :
            transformedScheme.variableCodings || [];
        givenCodings.forEach((c) => {
            this.variableCodings.map(vc => vc.codes.map(code => {
                if (code.id === null)
                    code.id = 'INVALID';
                return code;
            }));
            if (codingSchemeMajorVersion < 3) {
                this.variableCodings.push(CodingScheme.getCodeVersionLessThan3(c));
            }
            else {
                this.variableCodings.push(c);
            }
        });
    }
    static getCodeVersionLessThan3(givenCoding) {
        let valueProcessing = givenCoding.processing ||
            givenCoding.preProcessing ||
            givenCoding.valueTransformations ||
            [];
        if (valueProcessing && valueProcessing.includes('REMOVE_WHITE_SPACES')) {
            valueProcessing = valueProcessing.filter(vp => vp !== 'REMOVE_WHITE_SPACES');
            valueProcessing.push('IGNORE_ALL_SPACES');
        }
        const newCoding = {
            id: givenCoding.id,
            alias: givenCoding.alias || givenCoding.id,
            label: givenCoding.label || '',
            sourceType: 'BASE',
            sourceParameters: {
                solverExpression: givenCoding.sourceParameters ?
                    givenCoding.sourceParameters.solverExpression || '' :
                    '',
                processing: givenCoding.sourceParameters ?
                    givenCoding.sourceParameters.processing || [] :
                    []
            },
            deriveSources: givenCoding.deriveSources || [],
            processing: valueProcessing,
            fragmenting: givenCoding.fragmenting || '',
            manualInstruction: givenCoding.manualInstruction || '',
            codeModel: givenCoding.codeModel || 'NONE',
            page: givenCoding.page || '0',
            codes: []
        };
        if (givenCoding.sourceType === 'DERIVE_CONCAT') {
            if (givenCoding.deriveSourceType === 'VALUE') {
                newCoding.sourceType = 'COPY_VALUE';
            }
            else {
                newCoding.sourceType = 'CONCAT_CODE';
            }
        }
        else if (givenCoding.sourceType === 'DERIVE_SUM') {
            if (givenCoding.deriveSourceType === 'VALUE') {
                newCoding.sourceType = 'COPY_VALUE';
            }
            else if (givenCoding.deriveSourceType === 'CODE') {
                newCoding.sourceType = 'SUM_CODE';
            }
            else {
                newCoding.sourceType = 'SUM_SCORE';
            }
        }
        else if (givenCoding.sourceType === 'COPY_FIRST_VALUE') {
            newCoding.sourceType = 'COPY_VALUE';
        }
        else {
            newCoding.sourceType = givenCoding.sourceType;
        }
        if (givenCoding.codeModel !== 'NONE') {
            newCoding.codeModel =
                givenCoding.codeModel === 'MANUAL' ? 'MANUAL_ONLY' : 'NONE';
        }
        if (givenCoding.codes && Array.isArray(givenCoding.codes)) {
            givenCoding.codes.forEach((code) => {
                if (code.ruleSets) {
                    const elseRule = code.ruleSets.find((rs) => !!rs.rules.find((r) => r.method === 'ELSE'));
                    if (elseRule) {
                        newCoding.codes.push({
                            id: code.id,
                            type: 'RESIDUAL_AUTO',
                            label: code.label,
                            score: 0,
                            ruleSetOperatorAnd: false,
                            ruleSets: [],
                            manualInstruction: code.manualInstruction
                        });
                    }
                    else {
                        if (!code.type)
                            code.type = 'UNSET';
                        newCoding.codes.push(code);
                    }
                }
                else if (code.rules && Array.isArray(code.rules)) {
                    newCoding.codes.push({
                        id: code.id,
                        type: 'UNSET',
                        label: code.label || '',
                        score: code.score || 0,
                        ruleSetOperatorAnd: false,
                        ruleSets: [
                            {
                                ruleOperatorAnd: code.ruleOperatorAnd || false,
                                rules: code.rules
                            }
                        ],
                        manualInstruction: code.manualInstruction || ''
                    });
                }
            });
        }
        return newCoding;
    }
    static checkVersion(givenScheme) {
        const transformedScheme = typeof givenScheme === 'string' ? JSON.parse(givenScheme) : givenScheme;
        let localCodingSchemeVersionMajor = 0;
        let localCodingSchemeVersionMinor = 0;
        if (!Array.isArray(transformedScheme) && transformedScheme.version) {
            const versionMatches = /^(\d+).(\d+)$/.exec(transformedScheme.version);
            if (versionMatches && versionMatches.length > 2) {
                localCodingSchemeVersionMajor = Number.parseInt(versionMatches[1], 10);
                localCodingSchemeVersionMinor = Number.parseInt(versionMatches[2], 10);
            }
        }
        if (exports.CodingSchemeVersionMajor < localCodingSchemeVersionMajor)
            return 'MAJOR_GREATER';
        if (exports.CodingSchemeVersionMajor > localCodingSchemeVersionMajor)
            return 'MAJOR_LESS';
        if (exports.CodingSchemeVersionMinor > localCodingSchemeVersionMinor)
            return 'MINOR_GREATER';
        return 'OK';
    }
    toString() {
        return JSON.stringify({
            version: `${exports.CodingSchemeVersionMajor}.${exports.CodingSchemeVersionMinor}`,
            variables: this.variableCodings
        });
    }
}
exports.CodingScheme = CodingScheme;
//# sourceMappingURL=coding-scheme.interface.js.map