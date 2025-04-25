"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugTypeguard = exports.isResponseList = exports.isResponse = exports.isCodingProbabilities = exports.isResponseValueType = exports.isCarrier = exports.contains = exports.isMapOf = exports.isArrayOf = exports.isA = exports.ResponseStatusList = void 0;
exports.ResponseStatusList = ['UNSET', 'NOT_REACHED', 'DISPLAYED', 'VALUE_CHANGED', 'SOURCE_MISSING',
    'DERIVE_ERROR', 'VALUE_DERIVED', 'NO_CODING', 'INVALID', 'CODING_INCOMPLETE', 'CODING_ERROR', 'CODING_COMPLETE',
    'CODING_SEMI_COMPLETE'
];
const isA = (collection, str) => (typeof str === "string") &&
    collection.includes(str);
exports.isA = isA;
const isArrayOf = (thing, typeGuard) => Array.isArray(thing) && thing.every(typeGuard);
exports.isArrayOf = isArrayOf;
const isMapOf = (thing, typeGuard) => (typeof thing === 'object') &&
    (thing != null) &&
    (0, exports.isArrayOf)(Object.values(thing), typeGuard);
exports.isMapOf = isMapOf;
const contains = (thing, fieldName, example) => (typeof thing === 'object') && (thing != null) && (fieldName in thing) &&
    (typeof thing[fieldName] === typeof example);
exports.contains = contains;
const isCarrier = (thing, fieldName, collection) => (typeof thing === 'object') && (thing != null) && (fieldName in thing) &&
    (typeof thing[fieldName] === "string") && collection.includes(thing[fieldName]);
exports.isCarrier = isCarrier;
const isResponseValueType = (thing) => (Array.isArray(thing) && thing.every(exports.isResponseValueType)) ||
    (['string', 'number', 'boolean'].includes(typeof thing)) ||
    (thing == null);
exports.isResponseValueType = isResponseValueType;
const isCodingProbabilities = (thing) => (typeof thing === 'object') && (thing != null) &&
    Object.values(thing).every(k => typeof k === 'number');
exports.isCodingProbabilities = isCodingProbabilities;
const isResponse = (thing) => (typeof thing === 'object') && (thing != null) &&
    ('id' in thing) && (typeof thing.id === "string") &&
    ('status' in thing) && (0, exports.isA)(exports.ResponseStatusList, thing.status) &&
    ('value' in thing) && (0, exports.isResponseValueType)(thing.value) &&
    (!('subform' in thing) || (typeof thing.subform === 'string')) &&
    (!('code' in thing) || (typeof thing.code === 'number')) &&
    (!('score' in thing) || (typeof thing.score === 'number')) &&
    (!('codingProbabilities' in thing) || (0, exports.isCodingProbabilities)(thing.codingProbabilities));
exports.isResponse = isResponse;
const isResponseList = (thing) => (0, exports.isArrayOf)(thing, exports.isResponse);
exports.isResponseList = isResponseList;
const debugTypeguard = (input, typeguard) => {
    console.log('debug-typeguard:', typeguard.name);
    console.log('test-object:', input);
    const conditions = typeguard.toString().split('=>', 2)[1].split('&&');
    const firstFailingCondition = conditions
        .filter(condition => !!condition)
        .find(condition => {
        console.log('condition:', condition);
        const result = eval(`(function test(thing) { return ${condition}; })`)(input);
        console.log(result);
        return !result;
    });
    console.log('final result:', !firstFailingCondition);
    return !firstFailingCondition;
};
exports.debugTypeguard = debugTypeguard;
//# sourceMappingURL=iqb.interfaces.js.map