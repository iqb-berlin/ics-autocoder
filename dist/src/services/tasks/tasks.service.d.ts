import { DataService } from '../data/data.service';
import { DataChunk, ResponseRow, Task, TaskAction, TaskEventType, TaskUpdate } from "iqbspecs-coding-service/interfaces/ics-api.interfaces";
import { AutoCodingInstructions } from "iqbspecs-coding-service/interfaces/iqb.interfaces";
export declare class TasksService {
    private ds;
    constructor(ds: DataService);
    private tasks;
    exists(id: string): boolean;
    getAll(): Task[];
    static getLastEvent(task: Task): TaskEventType;
    get(id: string): Task;
    getNext(): Task | undefined;
    add(seed: TaskUpdate, instructions: AutoCodingInstructions): Task;
    action(id: string, taskAction: TaskAction): Task;
    delete(id: string): void;
    addData(taskId: string, data: ResponseRow[]): DataChunk;
    static hasData(task: Task, chunkId: string): boolean;
    getData(taskId: string, chunkId: string): ResponseRow[];
    deleteData(taskId: string, chunkId: string): void;
    restore(): void;
    updateInstructions(taskId: string, instructions: AutoCodingInstructions): Task;
}
