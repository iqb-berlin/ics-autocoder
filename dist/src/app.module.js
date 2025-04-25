"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const info_controller_1 = require("./controller/info/info.controller");
const tasks_service_1 = require("./services/tasks/tasks.service");
const tasks_controller_1 = require("./controller/tasks/tasks.controller");
const data_service_1 = require("./services/data/data.service");
const worker_service_1 = require("./services/worker/worker.service");
const autocoder_service_1 = require("./services/autocoder/autocoder.service");
const path = require("path");
let AppModule = AppModule_1 = class AppModule {
    static init() {
        return {
            module: AppModule_1,
            providers: [
                { provide: 'STORAGE_DIR', useValue: path.join(__dirname, '/../../../data') },
            ],
            exports: ['STORAGE_DIR']
        };
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [info_controller_1.InfoController, tasks_controller_1.TasksController],
        providers: [tasks_service_1.TasksService, data_service_1.DataService, worker_service_1.WorkerService, autocoder_service_1.AutocoderService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map