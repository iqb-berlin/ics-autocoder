"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = require("ajv");
const fs_1 = require("fs");
const ajv = new ajv_1.default();
const schemaFilename = process.argv[3];
const testDataFolder = process.argv[4];
describe(testDataFolder, () => {
    const schemaFileContent = fs_1.default.readFileSync(schemaFilename, 'utf8');
    let compiledSchema = ajv.compile(JSON.parse(schemaFileContent));
    test('schema valid as json file', () => {
        expect(compiledSchema).not.toBeNull();
    });
    describe('valid cases', () => {
        const validFolder = `${__dirname}/${testDataFolder}/test_valid`;
        if (compiledSchema && fs_1.default.existsSync(validFolder)) {
            fs_1.default.readdirSync(validFolder).forEach((file) => {
                const data = fs_1.default.readFileSync(`${validFolder}/${file}`, 'utf8');
                const valid = compiledSchema ? compiledSchema(JSON.parse(data)) : null;
                test(file, () => {
                    expect(valid).toBeTruthy();
                });
            });
        }
    });
    describe('invalid cases', () => {
        const invalidFolder = `${__dirname}/${testDataFolder}/test_invalid`;
        if (compiledSchema && fs_1.default.existsSync(invalidFolder)) {
            fs_1.default.readdirSync(invalidFolder).forEach((file) => {
                const data = fs_1.default.readFileSync(`${invalidFolder}/${file}`, 'utf8');
                const valid = compiledSchema ? compiledSchema(JSON.parse(data)) : null;
                test(file, () => {
                    expect(valid).not.toBeTruthy();
                });
            });
        }
    });
});
//# sourceMappingURL=test.js.map