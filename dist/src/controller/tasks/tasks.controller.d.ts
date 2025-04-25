import { TasksService } from '../../services/tasks/tasks.service';
import { DataChunk, ResponseRow, Task } from '../../interfaces/api.interfaces';
import { AutocoderService } from '../../services/autocoder/autocoder.service';
export declare class TasksController {
    private readonly ts;
    private readonly as;
    constructor(ts: TasksService, as: AutocoderService);
    getAll(): Task[];
    put(body: unknown): Task;
    get(taskId: string): Task;
    patch(taskId: string, body: unknown): Task;
    delete(taskId: string): void;
    putData(taskId: string, body: unknown): DataChunk;
    getData(taskId: string, chunkId: string): ResponseRow[];
    deleteData(taskId: string, chunkId: string): void;
    patchInstructions(taskId: string, body: unknown): import("iqbspecs-coding-service/interfaces/ics-api.interfaces").Task;
    static validateDataChunk(thing: unknown): thing is ResponseRow[];
}
