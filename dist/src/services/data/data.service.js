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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const id_service_1 = require("../id.service");
let DataService = class DataService {
    constructor(storageDir) {
        this.storageDir = storageDir;
        if (!fs.existsSync(`${this.storageDir}/data`)) {
            fs.mkdirSync(`${this.storageDir}/data`);
        }
    }
    add(data) {
        const id = id_service_1.IdService.create();
        fs.writeFileSync(`${this.storageDir}/data/${id}.json`, JSON.stringify(data), { encoding: 'utf8' });
        return id;
    }
    get(chunkId) {
        if (!fs.existsSync(`${this.storageDir}/data/${chunkId}.json`)) {
            throw new common_1.HttpException(`Data chunk '${chunkId}' not found.`, common_1.HttpStatus.NOT_FOUND);
        }
        const data = fs.readFileSync(`${this.storageDir}/data/${chunkId}.json`, { encoding: 'utf8' });
        return JSON.parse(data);
    }
    delete(chunkId) {
        if (fs.existsSync(`${this.storageDir}/data/${chunkId}.json`)) {
            throw new common_1.HttpException(`Data chunk not found.`, common_1.HttpStatus.NOT_FOUND);
        }
        fs.rmSync(`${this.storageDir}/${chunkId}.json`);
    }
    restore() {
        return fs.readdirSync(`${this.storageDir}/data/`)
            .filter(file => file.endsWith('.json'))
            .map(file => {
            return file.substring(0, file.indexOf('.json'));
        });
    }
    store(id, coded) {
        fs.writeFileSync(`${this.storageDir}/data/${id}.json`, JSON.stringify(coded));
    }
    getExampleCodingScheme() {
        return {
            variableCodings: []
        };
    }
};
exports.DataService = DataService;
exports.DataService = DataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('STORAGE_DIR')),
    __metadata("design:paramtypes", [String])
], DataService);
//# sourceMappingURL=data.service.js.map