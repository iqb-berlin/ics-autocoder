import { ResponseRow } from "iqbspecs-coding-service/interfaces/ics-api.interfaces";
import { AutoCodingInstructions } from "iqbspecs-coding-service/interfaces/iqb.interfaces";
export declare class DataService {
    private storageDir;
    constructor(storageDir: string);
    add(data: ResponseRow[]): string;
    get(chunkId: string): ResponseRow[];
    delete(chunkId: string): void;
    restore(): string[];
    store(id: string, coded: ResponseRow[]): void;
    getExampleCodingScheme(): AutoCodingInstructions;
}
