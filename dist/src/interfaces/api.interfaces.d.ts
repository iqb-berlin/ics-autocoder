import { Response } from './iqb.interfaces';
export interface ServiceInfo {
    readonly id: string;
    readonly type: string;
    readonly version: string;
    readonly apiVersion: string;
    readonly instructionsSchema: JSONSchema;
    readonly instructionsText?: string;
}
export interface TaskTypeInfo {
    readonly instructionsText: string;
    readonly instructionsSchema: JSONSchema;
}
export declare const TaskTypes: readonly ["train", "code", "unknown"];
export declare const TaskActions: readonly ["commit", "abort"];
export declare const TaskEventTypes: readonly ["create", "commit", "start", "fail", "finish", "abort"];
export declare const ChunkTypes: readonly ["input", "output"];
export type TaskType = (typeof TaskTypes[number]);
export type TaskAction = (typeof TaskActions[number]);
export type TaskEventType = (typeof TaskEventTypes[number]);
export type ChunkType = (typeof ChunkTypes[number]);
export interface TaskEvent {
    readonly status: TaskEventType;
    readonly message: string;
    readonly timestamp: number;
}
export interface DataChunk {
    readonly id: string;
    readonly type: ChunkType;
}
export interface TaskSeed {
    type: TaskType;
    label?: string;
}
export interface TaskUpdate {
    type?: TaskType;
    label?: string;
    instructions?: {
        [prop: string]: any;
    } | string;
}
export interface TaskInstructions {
    [prop: string]: any;
}
export interface Task extends TaskSeed {
    id: string;
    events: TaskEvent[];
    data: DataChunk[];
    instructions?: TaskInstructions | string;
}
export interface ResponseRow extends Response {
    readonly setId: string;
}
export interface JSONSchema {
    $id: string;
    $schema: string;
}
export interface Coder {
    id: string;
    label: string;
}
export declare const isCoder: (thing: unknown) => thing is Coder;
export declare const isTaskInstructions: (thing: unknown) => thing is TaskInstructions;
export declare const isTaskEvent: (thing: unknown) => thing is TaskEvent;
export declare const isDataChunk: (thing: unknown) => thing is DataChunk;
export declare const isTask: (thing: unknown) => thing is Task;
export declare const isTaskTypeInfo: (thing: unknown) => thing is TaskTypeInfo;
export declare const isTaskSeed: (thing: unknown) => thing is TaskSeed;
export declare const isJsonSchema: (thing: unknown) => thing is JSONSchema;
export declare const isServiceInfo: (thing: unknown) => thing is ServiceInfo;
export declare const isResponseRow: (thing: unknown) => thing is ResponseRow;
export declare const isResponseRowList: (thing: unknown) => thing is ResponseRow[];
