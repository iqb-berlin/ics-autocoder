"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutocoderService = void 0;
const common_1 = require("@nestjs/common");
const codingSchemeSchema = require("../../../specs/coding-scheme.schema.json");
const jsonschema_1 = require("jsonschema");
let AutocoderService = class AutocoderService {
    constructor() {
        this.schema = codingSchemeSchema;
        this.validator = new jsonschema_1.Validator();
    }
    validateScheme(codingScheme) {
        try {
            this.validator.validate(codingScheme, this.schema, { required: true, throwAll: true });
            return true;
        }
        catch (e) {
            console.log(e);
            const text = (e instanceof jsonschema_1.ValidatorResultError) ?
                e.errors.map(e => e.stack) :
                e;
            console.error(text);
            console.log(codingScheme);
            throw new common_1.HttpException('Invalid Scheme: ' + text, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
    getEmptyScheme() {
        const scheme = { version: '0.0', variableCodings: [] };
        if (this.validateScheme(scheme))
            return scheme;
        throw new Error('Could not create empty scheme');
    }
};
exports.AutocoderService = AutocoderService;
exports.AutocoderService = AutocoderService = __decorate([
    (0, common_1.Injectable)()
], AutocoderService);
//# sourceMappingURL=autocoder.service.js.map