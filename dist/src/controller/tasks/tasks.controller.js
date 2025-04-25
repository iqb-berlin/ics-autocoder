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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TasksController_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("../../services/tasks/tasks.service");
const api_interfaces_1 = require("../../interfaces/api.interfaces");
const iqb_interfaces_1 = require("../../interfaces/iqb.interfaces");
const autocoder_service_1 = require("../../services/autocoder/autocoder.service");
let TasksController = TasksController_1 = class TasksController {
    constructor(ts, as) {
        this.ts = ts;
        this.as = as;
    }
    getAll() {
        return this.ts.getAll();
    }
    put(body) {
        if (!(0, api_interfaces_1.isTaskSeed)(body))
            throw new common_1.HttpException('Invalid or missing task-type.', common_1.HttpStatus.NOT_ACCEPTABLE);
        return this.ts.add(body, this.as.getEmptyScheme());
    }
    get(taskId) {
        return this.ts.get(taskId);
    }
    patch(taskId, body) {
        if (!(0, iqb_interfaces_1.isCarrier)(body, 'action', api_interfaces_1.TaskActions))
            throw new common_1.HttpException('Invalid body', common_1.HttpStatus.NOT_ACCEPTABLE);
        return this.ts.action(taskId, body.action);
    }
    delete(taskId) {
        this.ts.delete(taskId);
    }
    putData(taskId, body) {
        if (!TasksController_1.validateDataChunk(body))
            return { id: 'invalid data', type: 'input' };
        return this.ts.addData(taskId, body);
    }
    getData(taskId, chunkId) {
        return this.ts.getData(taskId, chunkId);
    }
    deleteData(taskId, chunkId) {
        this.ts.deleteData(taskId, chunkId);
    }
    patchInstructions(taskId, body) {
        if ((typeof body !== 'object') || (body == null)) {
            console.log(body);
            throw new common_1.HttpException('Invalid body!', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        if (this.as.validateScheme(body))
            return this.ts.updateInstructions(taskId, body);
        throw new common_1.HttpException('Validation of coding scheme did not work.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    static validateDataChunk(thing) {
        if (!Array.isArray(thing)) {
            throw new common_1.HttpException('Not an Array.', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const failure = thing.findIndex(r => !(0, iqb_interfaces_1.isResponse)(r));
        if (failure > -1) {
            console.log(thing[failure]);
            throw new common_1.HttpException(`Invalid dataset nr ${failure}.`, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        return true;
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TasksController.prototype, "getAll", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_a = typeof api_interfaces_1.Task !== "undefined" && api_interfaces_1.Task) === "function" ? _a : Object)
], TasksController.prototype, "put", null);
__decorate([
    (0, common_1.Get)(':taskId'),
    __param(0, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof api_interfaces_1.Task !== "undefined" && api_interfaces_1.Task) === "function" ? _b : Object)
], TasksController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)('/:taskId'),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_c = typeof api_interfaces_1.Task !== "undefined" && api_interfaces_1.Task) === "function" ? _c : Object)
], TasksController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)('/:taskId'),
    __param(0, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('/:taskId/data'),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_d = typeof api_interfaces_1.DataChunk !== "undefined" && api_interfaces_1.DataChunk) === "function" ? _d : Object)
], TasksController.prototype, "putData", null);
__decorate([
    (0, common_1.Get)('/:taskId/data/:chunkId'),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, common_1.Param)('chunkId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Array)
], TasksController.prototype, "getData", null);
__decorate([
    (0, common_1.Delete)('/:taskId/data/:chunkId'),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, common_1.Param)('chunkId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "deleteData", null);
__decorate([
    (0, common_1.Patch)('/:taskId/instructions'),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "patchInstructions", null);
exports.TasksController = TasksController = TasksController_1 = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService,
        autocoder_service_1.AutocoderService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map