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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoController = void 0;
const common_1 = require("@nestjs/common");
const packageJson = require("../../../package.json");
const api_interfaces_1 = require("../../interfaces/api.interfaces");
const autocoder_service_1 = require("../../services/autocoder/autocoder.service");
let InfoController = class InfoController {
    constructor(as) {
        this.as = as;
    }
    get(request) {
        return {
            apiVersion: packageJson?.iqb.codingServiceApiVersion || 'unknown',
            id: packageJson.name + '@ident',
            type: packageJson.name,
            version: packageJson.version,
            taskTypes: {
                code: {
                    instructionsText: 'Blablabla',
                    instructionsSchema: this.as.schema
                }
            }
        };
    }
};
exports.InfoController = InfoController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", typeof (_a = typeof api_interfaces_1.ServiceInfo !== "undefined" && api_interfaces_1.ServiceInfo) === "function" ? _a : Object)
], InfoController.prototype, "get", null);
exports.InfoController = InfoController = __decorate([
    (0, common_1.Controller)('info'),
    __metadata("design:paramtypes", [autocoder_service_1.AutocoderService])
], InfoController);
//# sourceMappingURL=info.controller.js.map