"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdService = void 0;
class IdService {
    static create(length = 12, alphabet = 'abcdefghijklmnopqrstuvwxyz') {
        return Array
            .from({ length })
            .map(_ => alphabet[Math.floor(Math.random() * alphabet.length)])
            .join('');
    }
}
exports.IdService = IdService;
//# sourceMappingURL=id.service.js.map