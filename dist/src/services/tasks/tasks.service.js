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
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const id_service_1 = require("../id.service");
const data_service_1 = require("../data/data.service");
let TasksService = TasksService_1 = class TasksService {
    constructor(ds) {
        this.ds = ds;
        this.tasks = {};
        this.restore();
    }
    exists(id) {
        return typeof this.tasks[id] !== 'undefined';
    }
    getAll() {
        return Object.values(this.tasks);
    }
    static getLastEvent(task) {
        if (!task.events.length) {
            throw new Error('Invalid task. Task must contain at least the event of it\'s creation');
        }
        return task.events.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)[0].status;
    }
    get(id) {
        if (!this.exists(id)) {
            throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
        }
        return this.tasks[id];
    }
    getNext() {
        return Object.values(this.tasks).find(task => TasksService_1.getLastEvent(task) === 'commit');
    }
    add(seed, instructions) {
        const newTask = {
            id: id_service_1.IdService.create(),
            events: [{
                    status: 'create',
                    message: '',
                    timestamp: Date.now()
                }],
            type: seed.type || 'unknown',
            label: seed.label,
            data: [],
            instructions,
        };
        this.tasks[newTask.id] = newTask;
        return newTask;
    }
    action(id, taskAction) {
        const task = this.get(id);
        const lastEvent = TasksService_1.getLastEvent(task);
        switch (taskAction) {
            case 'commit':
                if (lastEvent !== 'create') {
                    throw new common_1.HttpException(`Can not commit ${lastEvent}ed task.`, common_1.HttpStatus.NOT_ACCEPTABLE);
                }
                task.events.push({
                    status: 'commit',
                    message: '',
                    timestamp: Date.now()
                });
                console.log('TODO');
                break;
            case 'abort': {
                task.events.push({
                    status: 'abort',
                    message: '',
                    timestamp: Date.now()
                });
                console.log('TODO');
                break;
            }
        }
        return this.tasks[id];
    }
    delete(id) {
        const task = this.get(id);
        const lastEvent = TasksService_1.getLastEvent(task);
        if (!['fail', 'finish', 'abort'].includes(lastEvent)) {
            throw new common_1.HttpException(`Can not delete ${lastEvent}ed task.`, common_1.HttpStatus.FORBIDDEN);
        }
        delete this.tasks[id];
    }
    addData(taskId, data) {
        const task = this.get(taskId);
        const lastEvent = TasksService_1.getLastEvent(task);
        if (lastEvent !== 'create') {
            throw new common_1.HttpException(`Can not add data to ${lastEvent}ed task.`, common_1.HttpStatus.FORBIDDEN);
        }
        const chunk = {
            id: this.ds.add(data),
            type: 'input'
        };
        task.data.push(chunk);
        return chunk;
    }
    static hasData(task, chunkId) {
        return task.data.some(d => d.id == chunkId);
    }
    getData(taskId, chunkId) {
        const task = this.get(taskId);
        if (!TasksService_1.hasData(task, chunkId)) {
            throw new common_1.HttpException(`Data chunk not attached to task`, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        return this.ds.get(chunkId);
    }
    deleteData(taskId, chunkId) {
        const task = this.get(taskId);
        if (!TasksService_1.hasData(task, chunkId)) {
            throw new common_1.HttpException(`Data chunk not attached to task`, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        this.ds.delete(chunkId);
    }
    restore() {
        if (Object.keys(this.tasks).length > 0) {
            throw new Error('Only call restore on bootstrap application');
        }
        const data = this.ds.restore();
        const exampleCodingScheme = this.ds.getExampleCodingScheme();
        if (!data.length)
            return;
        const id = '__orphaned_data__';
        this.tasks[id] = {
            data: data.map(chunkId => ({
                id: chunkId,
                type: 'input'
            })),
            events: [{
                    status: 'create',
                    message: 'automatically created because data dir was not empty on startup',
                    timestamp: Date.now()
                }],
            id,
            type: 'unknown',
            instructions: exampleCodingScheme
        };
    }
    updateInstructions(taskId, instructions) {
        const task = this.get(taskId);
        task.instructions = instructions;
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map