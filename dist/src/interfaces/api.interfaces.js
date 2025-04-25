"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResponseRowList = exports.isResponseRow = exports.isServiceInfo = exports.isJsonSchema = exports.isTaskSeed = exports.isTaskTypeInfo = exports.isTask = exports.isDataChunk = exports.isTaskEvent = exports.isTaskInstructions = exports.isCoder = exports.ChunkTypes = exports.TaskEventTypes = exports.TaskActions = exports.TaskTypes = void 0;
const iqb_interfaces_1 = require("./iqb.interfaces");
exports.TaskTypes = ['train', 'code', 'unknown'];
exports.TaskActions = ['commit', 'abort'];
exports.TaskEventTypes = ['create', 'commit', 'start', 'fail', 'finish', 'abort'];
exports.ChunkTypes = ['input', 'output'];
const isCoder = (thing) => (typeof thing == 'object') && (thing != null) &&
    ('id' in thing) && (typeof thing.id === 'string') &&
    ('label' in thing) && (typeof thing.label === 'string');
exports.isCoder = isCoder;
const isTaskInstructions = (thing) => (typeof thing == 'object') && (thing != null);
exports.isTaskInstructions = isTaskInstructions;
const isTaskEvent = (thing) => (typeof thing == 'object') && (thing != null) &&
    ('timestamp' in thing) && (typeof thing.timestamp === 'number') &&
    ('status' in thing) && (typeof thing.status === 'string') && (0, iqb_interfaces_1.isA)(exports.TaskEventTypes, thing.status);
exports.isTaskEvent = isTaskEvent;
const isDataChunk = (thing) => (typeof thing === 'object') && (thing != null) &&
    ('id' in thing) && (typeof thing.id === 'string') &&
    ('type' in thing) && (0, iqb_interfaces_1.isA)(exports.ChunkTypes, thing.type);
exports.isDataChunk = isDataChunk;
const isTask = (thing) => (typeof thing === 'object') && (thing != null) &&
    ('id' in thing) && (typeof thing.id === 'string') &&
    ('type' in thing) && (0, iqb_interfaces_1.isA)(exports.TaskTypes, thing.type) &&
    ('events' in thing) && (0, iqb_interfaces_1.isArrayOf)(thing.events, exports.isTaskEvent) &&
    ('data' in thing) && (0, iqb_interfaces_1.isArrayOf)(thing.data, exports.isDataChunk) &&
    (!('instructions' in thing) || ((typeof thing.instructions === 'string') || (0, exports.isTaskInstructions)(thing.instructions)));
exports.isTask = isTask;
const isTaskTypeInfo = (thing) => (typeof thing === 'object') && (thing != null) &&
    ('instructionsText' in thing) && (typeof thing.instructionsText === 'string') &&
    ('instructionsSchema' in thing) && (0, exports.isJsonSchema)(thing.instructionsSchema);
exports.isTaskTypeInfo = isTaskTypeInfo;
const isTaskSeed = (thing) => (typeof thing === 'object') && (thing != null) &&
    ('type' in thing) && (0, iqb_interfaces_1.isA)(exports.TaskTypes, thing.type);
exports.isTaskSeed = isTaskSeed;
const isJsonSchema = (thing) => (typeof thing === 'object') && (thing != null) &&
    ('$id' in thing) && (typeof thing.$id === 'string') &&
    ('$schema' in thing) && (typeof thing.$schema === 'string');
exports.isJsonSchema = isJsonSchema;
const isServiceInfo = (thing) => (typeof thing == 'object') && (thing != null) &&
    ('id' in thing) && (typeof thing.id == 'string') &&
    ('type' in thing) && (typeof thing.type == 'string') &&
    ('version' in thing) && (typeof thing.version == 'string') &&
    ('apiVersion' in thing) && (typeof thing.apiVersion == 'string') &&
    ('instructionsSchema' in thing) && (0, exports.isJsonSchema)(thing.instructionsSchema);
exports.isServiceInfo = isServiceInfo;
const isResponseRow = (thing) => (typeof thing == 'object') && (thing != null) &&
    (0, iqb_interfaces_1.isResponse)(thing) && (0, iqb_interfaces_1.contains)(thing, 'setId', '');
exports.isResponseRow = isResponseRow;
const isResponseRowList = (thing) => (0, iqb_interfaces_1.isArrayOf)(thing, exports.isResponseRow);
exports.isResponseRowList = isResponseRowList;
//# sourceMappingURL=api.interfaces.js.map