"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const tasks_service_1 = require("../tasks/tasks.service");
const data_service_1 = require("../data/data.service");
const id_service_1 = require("../id.service");
const responses_1 = require("@iqb/responses");
let WorkerService = class WorkerService {
    constructor(ts, ds) {
        this.ts = ts;
        this.ds = ds;
        this.runner = (0, rxjs_1.interval)(1000);
        this.runner
            .subscribe(async (second) => {
            const nextTask = this.ts.getNext();
            if (!nextTask)
                return;
            console.log(second, nextTask.id);
            this.code(nextTask);
        });
    }
    code(task) {
        const stripSetId = (row) => {
            const copy = { ...row };
            delete copy.setId;
            return copy;
        };
        try {
            const inputData = task.data
                .filter(task => task.type == 'input')
                .flatMap(chunk => this.ds.get(chunk.id))
                .reduce((agg, row) => {
                if (!(row.setId in agg))
                    agg[row.setId] = [];
                agg[row.setId].push(stripSetId(row));
                return agg;
            }, {});
            const coded = Object.entries(inputData)
                .flatMap(([setId, set]) => responses_1.CodingSchemeFactory.code(set, task.instructions)
                .map((response) => ({ ...response, setId })));
            const id = id_service_1.IdService.create();
            this.ds.store(id, coded);
            task.data.push({
                id,
                type: 'output'
            });
            task.events.push({
                message: "Done!",
                status: "finish",
                timestamp: Date.now()
            });
        }
        catch (error) {
            task.events.push({
                message: (error instanceof Error) ? error.message : 'unknown error',
                status: 'fail',
                timestamp: Date.now()
            });
            console.error(error);
        }
    }
};
exports.WorkerService = WorkerService;
exports.WorkerService = WorkerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tasks_service_1.TasksService,
        data_service_1.DataService])
], WorkerService);
//# sourceMappingURL=worker.service.js.map