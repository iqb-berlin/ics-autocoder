import { TasksService } from '../tasks/tasks.service';
import { DataService } from '../data/data.service';
export declare class WorkerService {
    private readonly ts;
    private readonly ds;
    private runner;
    constructor(ts: TasksService, ds: DataService);
    private code;
}
